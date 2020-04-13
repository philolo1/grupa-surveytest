import React from 'react';
import { Provider } from 'mobx-react';

import './Firebase';

import Auth from '../mobx/Auth';
import User from '../mobx/User';
import Survey from '../mobx/Survey';

import GlobalStyle from '../styles/globalStyle';
import Routes from './Routes';
import Create from '../mobx/Create';

const user = new User()
const auth = new Auth(user)
const survey = new Survey(user)
const create = new Create(survey)
const stores = { auth, create, survey, user }

function App() {
  return (
    <Provider {...stores}>
      <GlobalStyle />
      <Routes />
    </Provider>
  );
}

export default App;
