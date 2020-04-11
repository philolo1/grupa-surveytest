import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import { Button } from '../components/signup/styles';

export default inject('survey')(observer(({ survey }) => {
  const { id, page } = useParams();
  const s = survey.currentSurvey
  //let linkText
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
      <Button onClick={() => survey.get(id)}>Load Survey</Button>
      {JSON.stringify(s)}
    </div>
  )
}))
