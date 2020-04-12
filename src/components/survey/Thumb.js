import React from 'react';
import { Link } from 'react-router-dom';

export default ({ survey }) => {
  window.mySurvey = survey.currentSurvey;
  return (
    <li>
      <Link to={`/survey/${survey.uid}`}>
        <div>
          {survey.title} - {survey.numberOfQuestions} - {survey.desc} -{' '}
          {survey.icon} - {survey.expiresAt}
        </div>
      </Link>
    </li>
  );
};
