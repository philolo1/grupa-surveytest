import React from 'react';
import { Link } from 'react-router-dom';

import Thumb from '../components/survey/Thumb';

export default () => (
  <div>
      <div>List</div>
      <Link to='/createSurvey'>create survey</Link>
      <ul>
        <Thumb id='1' name='Survey 1' />
        <Thumb id='2' name='Survey 2' />
      </ul>
  </div>
)
