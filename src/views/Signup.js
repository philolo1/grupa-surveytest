import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <div>Signup</div>
    <Link to="/">Login</Link>
    <br />
    <Link to="/list">List of surveys</Link>
  </div>
)
