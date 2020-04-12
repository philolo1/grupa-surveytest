import React from 'react';
import { useParams } from 'react-router';
import { Button } from '../components/signup/styles';
import { inject, observer } from 'mobx-react';

const ResultAnswer = ({answer, percentage}) => (
  <div>
    <div>{answer}</div>
    <div>{percentage}%</div>
  </div>
)

const ResultQuestion = ({ answers, question, totals}) => (
  <div>
      <div>{question.question}</div>
      {question.answers.map((a, i) => <ResultAnswer answer={a} key={i} percentage={Math.round( (answers[a] || 0) / totals * 100)} />)}
  </div>
)

export default inject('survey')(observer(({survey}) => {
  const { id } = useParams();
  const s = survey.currentSurvey
  const r = survey.currentResults
  return (
    <div>
      {`Result of  ${id}`}
      <Button onClick={() => {
        survey.get(id)
        survey.results(id)
      }}>Get results</Button>
      {s && r ? s.questions.map((q, i) => (
        <ResultQuestion key={i} question={q} answers={r.answers[q.id]} totals={r.totals[q.id]} />
      )) : null}
    </div>
  )
}))
