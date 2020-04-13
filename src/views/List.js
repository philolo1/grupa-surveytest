import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

import AddButton from '../components/button/AddButton';
import {
  Button,
  CategoryTitle,
  MyRow,
  Space
} from '../components/signup/styles';
import Page from '../components/Page';
import Thumb from '../components/survey/Thumb';

const CreateButton = () => (
  <Link to="/createSurvey" style={{ textDecoration: 'none' }}>
    <AddButton />
  </Link>
);

export default inject('survey', 'user')(
  observer(({ history, survey, user }) => {
    useEffect(() => {
      survey.load();
    }, [survey]);

    let isAdmin = user.isAdmin;
    return (
      <Page history={history}>
        <MyRow>
          <CategoryTitle>Surveys</CategoryTitle>
          <Space />
          {isAdmin ? <CreateButton /> : null}
        </MyRow>
        {survey.surveys.map((s, i) => (
          <Thumb key={i} survey={s} />
        ))}
        {survey.maxAttained || survey.loading ? null : <Button onClick={() => survey.loadMore()}>Load More</Button>}
        {survey.loading ? <div>Loading...</div> : null}
      </Page>
    );
  })
);
