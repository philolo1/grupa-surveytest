import React from 'react';
import { Provider } from 'mobx-react';

import './Firebase';

import Auth from '../mobx/Auth';
import User from '../mobx/User';
import Survey from '../mobx/Survey';

import GlobalStyle from '../styles/globalStyle';
import Routes from './Routes';
import { firestore } from 'firebase';
import Create from '../mobx/Create';

const user = new User()
const auth = new Auth(user)
const survey = new Survey(user)
const create = new Create(survey)
const stores = { auth, create, survey, user }

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
/*
setTimeout( () => {
  survey.create({
    desc: 'example survey',
    expiresAt: 1586817713,
    icon: 'tomato',
    numberOfQuestions: 3,
    title: 'Tomato test'
  }, [
    {type: 'single', question: 'What are you?', answers: ['Tomato', 'Cucumber', 'Daikon', 'Onion', 'Carrot']},
    {type: 'multi', question: 'What did you eat yesterday?', answers: ['Tomato', 'Cucumber', 'Daikon', 'Onion', 'Carrot']},
    {type: 'single', question: 'Are you sure?', answers: ['Oui', 'Maybe', 'Tomato']}
  ])
}, 5000)

setTimeout( () => {
  survey.answer('o7Mn9nDyCDn2kfOF7Jr6', [
    {id: 'CMmqixlyik6UdD2PS1gx', value: 'Tomato'},
    {id: 'MaNEIz27zE91uUvIncaS', value: 'Tomato'},
    {id: 'YjLMmn7IhDNuGuVotBho', value: 'Tomato'}])
  }, 3000)

setTimeout( () => {
  survey.create({
    desc: 'example survey',
    expiresAt: 1586817713,
    icon: 'tomato',
    numberOfQuestions: 3,
    title: 'Tomato test'
  }, [
    {type: 'single', question: 'What are you?', answers: ['Tomato', 'Cucumber', 'Daikon', 'Onion', 'Carrot']},
    {type: 'multi', question: 'What did you eat yesterday?', answers: ['Tomato', 'Cucumber', 'Daikon', 'Onion', 'Carrot']},
    {type: 'single', question: 'Are you sure?', answers: ['Oui', 'Maybe', 'Tomato']}
  ])
}, 5000)


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
