import { extendObservable } from "mobx";
import { firestore, auth } from "firebase";

export default class User {
  constructor () {
    extendObservable(this, {
      isAdmin: false,
      email: null,
      uid: null
    })
  }

  changeUser (id) {
    console.log('user changed', id)
    if (this.snapShotUnSub) {
      this.snapShotUnSub()
      this.snapShotUnSub = null
      this.isAdmin = false
      this.email = null
      this.uid = null
    }
    if (id) {
      this.snapShotUnSub = firestore().collection('users').doc(id).onSnapshot(this.handleChange)
    }
  }

  handleChange = (doc) => {
    const v = doc.data()
    if (v) {
      console.log('updating user', v)
      this.isAdmin = v.isAdmin
      this.email = auth().currentUser.email
      this.uid = auth().currentUser.uid
    }
  }
}
