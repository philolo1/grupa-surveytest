import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

export default () => {
  const { id, page } = useParams();

  let linkText
  let element
  if (page === undefined) {
    element = <Link to={`/survey/${id}/1`}>Start survey</Link>
  } else if (parseInt(page) >= 3) {
    element = <Link to={`/`}>Finish</Link>
  } else {
    element = <Link to={`/survey/${id}/${parseInt(page) + 1}`}>Next Question</Link>
  }

  return (
    <div>
      <div>{`Survey of ${id}, page: ${page}`}</div>
      <br />
      {element}
      <br />
      <Link to={`/results/${id}`}>Results</Link>
    </div>
  )
}
