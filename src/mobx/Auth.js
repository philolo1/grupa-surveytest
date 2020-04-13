import { auth, firestore } from 'firebase';
import { extendObservable } from 'mobx';

export default class Auth {
  constructor(userStore) {
    auth().onAuthStateChanged(this.authStateObserved);
    this.userStore = userStore;
    extendObservable(this, {
      authStateHasBeenObserved: false,
      uid: null,
      get isReady() {
        return (
          (this.uid === null || this.uid === this.userStore.uid) &&
          this.authStateHasBeenObserved
        );
      }
    });
  }

  authStateObserved = user => {
    if (user) {
      this.uid = user.uid;
      this.userStore.changeUser(user.uid);
    } else {
      this.uid = null;
      this.userStore.changeUser(null);
    }
    this.authStateHasBeenObserved = true;
  };

  logout() {
    auth().signOut();
  }

  login(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
  }

  signup(email, password, userName) {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        firestore()
          .collection('users')
          .doc(auth().currentUser.uid)
          .set({
            isAdmin: false,
            name: userName
          });
      });
  }
}
