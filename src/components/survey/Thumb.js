import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';

const Title = styled.div`
  display: flex;
  flex: 1;
  color: rgb(64, 64, 64);
  font-family: WorkSans-ExtraBold;
  font-size: 26px;
  font-weight: 800;
  // height: 30px;
  width: 100%;
  padding-bottom: 19px;
`;
const Row = styled.div`
  display: flex;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Space = styled.div`
  display: flex;
  flex: 1;
`;

export default ({ survey }) => {
  window.mySurvey = survey.currentSurvey;

  const isCompleted = _.sample([true, false]);

  console.log('isCompleted', Math.random(), isCompleted);
  return (
    <li>
      <Link to={`/survey/${survey.uid}`} style={{ textDecoration: 'none' }}>
        <div>
          <Column>
            <Row>
              {survey.icon}
              <Space />
              {isCompleted ? <div>Completed</div> : <div />}
            </Row>
            <Title>{survey.title}</Title>
            {survey.desc}
          </Column>
          <div style={{ height: 50, backgroundColor: 'blue' }} />1{survey.title}{' '}
          - 2{survey.numberOfQuestions} - 3{survey.desc} - 4{survey.icon} - 5
          {survey.expiresAt}
          🍔
        </div>
      </Link>
    </li>
  );
};
