import { auth, firestore } from "firebase";

export default class Auth {
  constructor (userStore) {
    auth().onAuthStateChanged(this.authStateObserved)
    this.userStore = userStore
  }

  authStateObserved = (user) => {
    if (user) {
      console.log(user.uid)
      this.userStore.changeUser(user.uid)
    } else {
      console.log('no user')
      this.userStore.changeUser(null)
    }
  }

  logout () {
    auth().signOut()
  }

  login (email, password) {
    auth().signInWithEmailAndPassword(email, password)
  }

  signup (email, password) {
    auth().createUserWithEmailAndPassword(email, password).then(() => {
      console.log('just created', auth().currentUser)
      //this.userStore.changeUser(auth().currentUser.uid)
      firestore().collection('users').doc(auth().currentUser.uid).set({
        isAdmin: false
      })
    })
  }
}
