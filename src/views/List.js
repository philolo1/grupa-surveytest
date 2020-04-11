import React from 'react';
import { Link } from 'react-router-dom';

import Thumb from '../components/survey/Thumb';
import { observer, inject } from 'mobx-react';
import { Button } from '../components/signup/styles';

export default inject('survey', 'user')(observer(({ survey, user }) => (
  <div>
      <div>List</div>
      {user.isAdmin ? <Link to='/createSurvey'>create survey</Link> : null}
      <ul>
        {survey.surveys.map((s, i) => <Thumb key={i} survey={s} />)}
      </ul>
      <Button onClick={() => survey.load()}>Load</Button>
      <Button onClick={() => survey.loadMore()}>Load More</Button>
      {survey.loading ? <div>Loading...</div> : null}
  </div>
)))
