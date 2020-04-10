import React from 'react';
import { Link } from 'react-router-dom';

export default ({ name, id }) => (
  <li>
    <Link to={`/survey/${id}`}>{name}</Link>
  </li>
)