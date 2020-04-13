import { auth, firestore } from "firebase";

export default class Auth {
  constructor (userStore) {
    auth().onAuthStateChanged(this.authStateObserved)
    this.userStore = userStore
  }

  authStateObserved = (user) => {
    if (user) {
      this.userStore.changeUser(user.uid)
    } else {
      this.userStore.changeUser(null)
    }
  }

  logout () {
    auth().signOut()
  }

  login (email, password) {
    auth().signInWithEmailAndPassword(email, password)
  }

  signup (email, password, userName) {
    return auth().createUserWithEmailAndPassword(email, password).then(() => {
      firestore().collection('users').doc(auth().currentUser.uid).set({
        isAdmin: false,
        name: userName
      })
    })
  }
}
