import { extendObservable } from "mobx";

export default class Create {
  constructor (survey) {
    this.surveyStore = survey
    extendObservable(this, {
      questions: [],
      survey: {}
    })
  }

  createNew () {
    this.survey = {}
    this.questions = []
  }

  addQuestion (question, answers) {
    this.questions.push({ question, answers })
    this.survey.numberOfQuestions = this.questions.length
  }

  setInfos (title, desc, icon, expiresAt = null) {
    this.survey.title = title
    this.survey.desc = desc
    this.survey.icon = icon
    if (expiresAt) {
      this.survey.expiresAt = expiresAt
    }
  }
}