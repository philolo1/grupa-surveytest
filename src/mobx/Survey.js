import { extendObservable } from "mobx";
import { firestore } from "firebase";

const LOADING_NUMBER = 10

export default class Survey {
  constructor (user) {
    this.userStore = user
    extendObservable(this, {
      currentSurvey: null,
      currentResults: null,
      cursor: 0,
      loading: false,
      maxAttained: false,
      surveys: []
    })
  }

  answer (surveyId, answers) {
    const o = {}
    answers.forEach((a,i) => {
      o[a.id] = a.value
    })
    firestore().collection('surveys').doc(surveyId).collection('answers').doc(this.userStore.uid).set(o)
    const a = this.userStore.answeredIds
    a.push(surveyId)
    firestore().collection('users').doc(this.userStore.uid).update({answeredIds: a})
  }

  create (survey, questions) {
    // survey must contains those fields: desc, expiresAt as seconds since unix, icon, title and numberOfQuestions
    try {
      survey.expiresAt = new firestore.Timestamp(survey.expiresAt || 0, 0)
      firestore().collection('surveys').add(survey).then(docRef => {
        questions.forEach((q,i) => {
          firestore().collection('surveys').doc(docRef.id).collection('questions').add(Object.assign(q, { idx: i+1 }))
        })
      })
    } catch (e) {
      console.error('Error happened while saving new survey', e)
    }
  }

  results (surveyId) {
    this.currentResults = null
    firestore().collection('surveys').doc(surveyId).collection('answers').get().then(snap => {
      const answers = {}, totals = {}
      snap.forEach(a => {
        const d = a.data()
        Object.keys(d).forEach(q => {
          if (!totals[q]) totals[q] = 0
          totals[q]++

          if (!answers[q]) answers[q] = {}
          if (!answers[q][d[q]]) answers[q][d[q]] = 0
          answers[q][d[q]]++
        })
      })
      this.currentResults = {answers, totals}
    })
  }

  get (id) {
    this.currentSurvey = null
    firestore().collection('surveys').doc(id).get().then(survey => {
      const s = survey.data()
      s.expiresAt = s.expiresAt.toMillis()
      firestore().collection('surveys').doc(id).collection('questions').get().then(questions => {
        const q = []
        questions.forEach(snap => q.push(Object.assign(snap.data(), {id: snap.id})))
        s.questions = q
        this.currentSurvey = s
      })
    })
  }

  loadMore () {
    if (this.maxAttained) {
      console.log('can\'t load more, max attained')
      return
    }

    this.loading = true
    firestore().collection('surveys').limit(LOADING_NUMBER).get().then(snap => {
      console.log('load some surveys', snap.size)
      this.loading = false
      snap.forEach(doc => {
        const s = Object.assign({}, doc.data(), {uid: doc.id, expiresAt: doc.data().expiresAt.toMillis()})
        console.log('s', s)
        this.surveys.push(s)
      })
      if (snap.size < LOADING_NUMBER) {
        this.maxAttained = true
      }
    })
  }

  load () {
    this.surveys = []
    this.cursor = 0
    this.maxAttained = false
    this.loadMore()
  }

  handleChange = (snap) => {
    const s = []
    snap.docChanges().forEach(change => {
      s.push(change.doc().data())
    })
  }
}
