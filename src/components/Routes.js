import React from 'react';
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
import Page from './Page';

export default inject('auth', 'user')(
  observer(({ auth, user }) => {
    if (!auth.isReady) {
      return <Page>Loading...</Page>
    }
    return (
      <Router>
        <Switch>
          {user.uid ? (
            <>
              {user.isAdmin ? (
                <>
                  <Route path="/createSurvey" component={Create} />
                  <Route
                    path="/titleAndDescription"
                    component={TitleAndDescription}
                  />
                  <Route path="/questions" component={Questions} />
                  <Route path="/addQuestion" component={AddQuestion} />
                </>
              ) : null}
              <Route path="/list" component={List} />
              <Route path="/results/:id" component={Result} />
              <Route path="/survey/:id/:page" component={Survey} />
              <Route exact path="/survey/:id" component={Survey} />
              <Route exact path="/" component={List} />
            </>
          ) : (
            <>
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route exact path="/" component={Login} />
            </>
          )}
        </Switch>
      </Router>
    );
  })
);
