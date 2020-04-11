import React from 'react';
import { Link } from 'react-router-dom';

export default ({ survey }) => (
  <li>
    <Link to={`/survey/${survey.uid}`}>{survey.title} - {survey.numberOfQuestions} - {survey.icon} - {survey.expiresAt}</Link>
  </li>
)