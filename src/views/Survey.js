import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default () => {
  const { id, page } = useParams();

  return (
    <div>
      <div>{`Survey of ${id}, page: ${page}`}</div>
      <Link to={`/results/${id}`}>Results</Link>
    </div>
  )
}
