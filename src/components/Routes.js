import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signup from '../views/Signup';
import Login from '../views/Login';
import List from '../views/List';
import Result from '../views/Result';
import Survey from '../views/Survey';
import Create from '../views/Create';
import TitleAndDescription from '../views/TitleAndDescription';
import Questions from '../views/Questions';
import AddQuestion from '../views/AddQuestion';
import { observer, inject } from 'mobx-react';

export default inject('user')(
  observer(({ user }) => {
    const [display, setDisplay] = useState(false);
    console.log('routes', user.uid);

    useEffect(() => {
      setTimeout(() => {
        setDisplay(true);
      }, 2000);
    }, []);

    if (!display) {
      return <div />;
    }

    return user.uid ? (
      <Router>
        <Switch>
          <Route path="/createSurvey" component={Create} />
          <Route path="/titleAndDescription" component={TitleAndDescription} />
          <Route path="/questions" component={Questions} />
          <Route path="/addQuestion" component={AddQuestion} />
          <Route path="/list/" component={List} />
          <Route path="/results/:id" component={Result} />
          <Route path="/survey/:id/:page" component={Survey} />
          <Route path="/survey/:id" component={Survey} />
          <Route path="/" component={List} />
        </Switch>
      </Router>
    ) : (
      <Router>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    );
  })
);
