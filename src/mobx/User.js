import { extendObservable } from "mobx";
import { firestore, auth } from "firebase";

export default class User {
  constructor () {
    extendObservable(this, {
      answeredIds: [],
      isAdmin: false,
      email: null,
      name: null,
      uid: null
    })
  }

  changeUser (id) {
    if (this.snapShotUnSub) {
      this.snapShotUnSub()
      this.snapShotUnSub = null
      this.answeredIds = []
      this.isAdmin = false
      this.email = null
      this.name = null
      this.uid = null
    }
    if (id) {
      this.snapShotUnSub = firestore().collection('users').doc(id).onSnapshot(this.handleChange)
    }
  }

  handleChange = (doc) => {
    const v = doc.data()
    if (v) {
      this.answeredIds = v.answeredIds || []
      this.isAdmin = v.isAdmin
      this.email = auth().currentUser.email
      this.name = v.name
      this.uid = auth().currentUser.uid
    }
  }
}
