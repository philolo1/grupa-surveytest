import React from 'react';
import { Provider } from 'mobx-react';

import './Firebase';

import Auth from '../mobx/Auth';
import User from '../mobx/User';

import GlobalStyle from '../styles/globalStyle';
import Routes from './Routes';

const user = new User()
const auth = new Auth(user)
const stores = { auth, user }

/*
setTimeout( () => {
  auth.signup('hugues.alex+121@gmail.com', 'qwerty', 'Hugues Alexandre')
}, 3000)

setTimeout( () => {
  auth.logout()
}, 5000)

setTimeout( () => {
  auth.login('hugues.alex@gmail.com', 'qwerty')
}, 7000)

setTimeout( () => {
  auth.logout()
}, 9000)
*/

function App() {
  return (
    <Provider {...stores}>
      <GlobalStyle />
      <Routes />
    </Provider>
  );
}

export default App;
