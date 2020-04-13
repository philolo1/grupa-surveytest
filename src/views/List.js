import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

import AddButton from '../components/button/AddButton';
import {
  Button,
  CategoryTitle,
  MyRow,
  Space
} from '../components/signup/styles';
import Page from '../components/Page';
import Thumb from '../components/survey/Thumb';

const StatusButton = styled.div`
  display: flex;
  flex: 1;
  background: rgb(247, 247, 247);
  border-radius: 0px;
  border: 1px solid rgb(231, 231, 231);
  height: 40px;
  color: rgb(64, 64, 64);
  font-family: SFProDisplay-Bold;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

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
        <MyRow>
          <StatusButton>Active</StatusButton>
          <StatusButton style={{ backgroundColor: 'white' }}>
            Closed
          </StatusButton>
        </MyRow>

        {survey.surveys.map((s, i) => (
          <Thumb key={i} survey={s} />
        ))}
        {survey.maxAttained ? null : <Button onClick={() => survey.loadMore()}>Load More</Button>}
        {survey.loading ? <div>Loading...</div> : null}
      </Page>
    );
  })
);
