import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import styled from 'styled-components';

export default ({ survey }) => {
  window.mySurvey = survey.currentSurvey;

  const isCompleted = _.sample([true, false]);

  console.log('isCompleted', Math.random(), isCompleted);
  return (
    <li>
      <Link to={`/survey/${survey.uid}`} style={{ textDecoration: 'none' }}>
        <div>
          1{survey.title} - 2{survey.numberOfQuestions} - 3{survey.desc} - 4
          {survey.icon} - 5{survey.expiresAt}
          🍔
        </div>
      </Link>
    </li>
  );
};
