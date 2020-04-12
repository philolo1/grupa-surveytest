import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import React, { useEffect } from 'react';

import { Button } from '../components/signup/styles';
import Page from '../components/Page';
import Thumb from '../components/survey/Thumb';

export default inject('survey', 'user')(
  observer(({ survey, user }) => {
    useEffect(() => {
      survey.load();
    }, []);

    console.log('survey', survey);
    return (
      <Page>
        <div>List</div>
        {user.isAdmin ? <Link to="/createSurvey">create survey</Link> : null}
        <ul>
          {survey.surveys.map((s, i) => (
            <Thumb key={i} survey={s} />
          ))}
        </ul>
        <Button onClick={() => survey.load()}>Load</Button>
        <Button onClick={() => survey.loadMore()}>Load More</Button>
        {survey.loading ? <div>Loading...</div> : null}
      </Page>
    );
  })
);
