import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { CategoryTitle, MyRow } from '../components/signup/styles';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { toJS } from 'mobx';
import Page from '../components/Page';
import BackRow from '../components/BackRow';

const Thumb = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-color: #23B394;
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
`

const Track = styled.div`
  width: 100%;
  height: 24px;
  background-color: #F2F2F2;
  margin-bottom: 15px;
`

const Col = styled(MyRow)`
  flex-direction: column;
  align-items: stretch;
`;

const Question = styled(CategoryTitle)`
  text-align: left;
`

const ProgressBar = ({ percentage }) => (
  <Track>
    <Thumb percentage={percentage}>
      {percentage}%
    </Thumb>
  </Track>
)

const ResultAnswer = ({answer, percentage}) => (
  <div>
    <div>{answer}</div>
    <ProgressBar percentage={percentage} />
  </div>
)

const ResultQuestion = ({ answers, question, totals}) => (
  <Col>
      <Question>{question.question}</Question>
      {question.answers.map((a, i) => <ResultAnswer answer={a} key={i} percentage={Math.round( (answers[a] || 0) / totals * 100)} />)}
  </Col>
)

export default inject('survey')(observer(({history, survey}) => {
  const { id } = useParams();
  useEffect(() => {
    survey.get(id)
    survey.results(id)
  }, [survey, id]);

  const s = toJS(survey.currentSurvey)
  const r = toJS(survey.currentResults)
  return (
    <Page history={history}>
      {s && r ? (
        <>
          <BackRow text={`Close ${s && s.title}`} onClick={() => history.push('/list')} />
          {s.questions.map((q, i) => (
          <ResultQuestion key={i} question={q} answers={r.answers[q.id]} totals={r.totals[q.id]} />
          ))}
        </>
      ) : null}
    </Page>
  )
}))
