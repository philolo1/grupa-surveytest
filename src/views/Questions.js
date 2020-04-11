import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <div>Questions</div>
      <Link to='/addQuestion'>add question</Link>
      <br />
      <Link to='/list'>save survey and go to list</Link>
  </div>
)
