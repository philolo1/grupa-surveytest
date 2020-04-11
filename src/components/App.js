import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Firebase from './Firebase';
import Login from '../views/Login';
import List from '../views/List';
import Result from '../views/Result';
import Survey from '../views/Survey';

import '../styles/App.css';

Firebase.db.ref('/').once('value', snap => console.log('Firebase connected: ', snap.val()))

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/list/" component={List} />
        <Route path="/results/:id" component={Result} />
        <Route path="/survey/:id/:page" component={Survey} />
        <Route path="/survey/:id" component={Survey} />
        <Route path="/" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
