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
  background-color: #23b394;
  font-size: 12px;
  color: white;
  display: flex;
  align-items: center;
`;

const ThumbText = styled.div`
  position: absolute;
  left: 10px;
  top: 4px;
  font-size: 12px;
  color: ${props => (props.percentage < 15 ? 'rgb(64, 64, 64)' : 'white')};
  display: flex;
  align-items: center;
`;

const Track = styled.div`
  position: relative;
  width: 100%;
  height: 24px;
  background-color: #f2f2f2;
  margin-bottom: 15px;
`;

const Col = styled(MyRow)`
  flex-direction: column;
  align-items: stretch;
`;

const Question = styled(CategoryTitle)`
  text-align: left;
`;

const ProgressBar = ({ percentage }) => (
  <Track>
    <Thumb percentage={percentage} />
    <ThumbText percentage={percentage}>{percentage}%</ThumbText>
  </Track>
);

const ResultAnswer = ({ answer, percentage }) => (
  <div>
    <div>{answer}</div>
    <ProgressBar percentage={percentage} />
  </div>
);

const ResultQuestion = ({ answers, question, totals }) => {
  return (
    <Col>
      <Question>{question.question}</Question>
      {totals == null ? (
        <div
          style={{
            fontSize: 20,
            fontStyle: 'italic',
            color: 'color: rgb(64, 64, 64)'
          }}
        >
          {' '}
          No Answers yet{' '}
        </div>
      ) : (
        question.answers.map((a, i) => (
          <ResultAnswer
            answer={a}
            key={i}
            percentage={
              totals === 0 || totals == null
                ? 0
                : Math.round(((answers ? answers[a] || 0 : 0) / totals) * 100)
            }
          />
        ))
      )}
    </Col>
  );
};

export default inject('survey')(
  observer(({ history, survey }) => {
    const { id } = useParams();
    useEffect(() => {
      survey.get(id);
      survey.results(id);
    }, [survey, id]);

    const s = toJS(survey.currentSurvey);
    const r = toJS(survey.currentResults);

    return (
      <Page history={history}>
        {s && r ? (
          <>
            <BackRow
              text={`Close ${s && s.title}`}
              onClick={() => history.push('/list')}
            />
            {s.questions.map((q, i) => (
              <ResultQuestion
                key={i}
                question={q}
                answers={r.answers[q.id]}
                totals={r.totals[q.id]}
              />
            ))}
          </>
        ) : null}
      </Page>
    );
  })
);
