import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import React, { useEffect } from 'react';

import { Button } from '../components/signup/styles';
import Page from '../components/Page';
import Thumb from '../components/survey/Thumb';

import styled from 'styled-components';

const Row = styled.div`
  display: flex;
`;

const MyRow = styled(Row)`
  // width: 100%;
  background-color: pink;
  padding-right: 16px;
  padding-left: 15px;
`;

const Space = styled.div`
  display: flex;
  flex: 1;
`;

const Title = styled.div`
  color: rgb(73, 73, 73);
  font-family: WorkSans-Black;
  font-size: 26px;
  font-weight: 900;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;
const SurveysTitle = styled(Title)`
  color: rgb(64, 64, 64);
  font-family: WorkSans-Black;
  font-size: 36px;
  font-weight: 900;
  text-align: center;
  padding-top: 31px;
  padding-bottom: 24px;
`;

const AddButton = styled.div`
  background: rgb(34, 179, 148);
  border-radius: 20px;
  height: 40px;
  width: 40px;
  margin-top: 32px;
`;

const UserIcon = styled.img`
  width: 18px;
  height: 18px;
  background-color: lightYellow;
  margin-top: 20px;
`;
const StatusButton = styled.div`
  display: flex;
  flex: 1;
  background: rgb(247, 247, 247);
  border-radius: 0px;
  border: 1px solid rgb(231, 231, 231);
  height: 40px;
  color: rgb(64, 64, 64);
  font-family: SFProDisplay-Bold;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
`;

const Header = ({}) => {
  return (
    <>
      <div style={{ height: 56 }} />
      <MyRow>
        <Title>Grupa</Title>
        <Space />
        <UserIcon />
      </MyRow>
      {/* <MyRow style={{ backgroundColor: 'pink' }}>
        {' '}
        <SurveysTitle>Surveys</SurveysTitle>
        <Space />
      </MyRow>
      <MyRow style={{ backgroundColor: 'lightYellow' }}>
        <StatusButton>Active</StatusButton>
        <StatusButton style={{ backgroundColor: 'white' }}>Closed</StatusButton>
      </MyRow> */}
    </>
  );
};
export default inject(
  'survey',
  'user'
)(
  observer(({ survey, user }) => {
    useEffect(() => {
      survey.load();
    }, [survey]);

    console.log('survey', survey);

    let isAdmin = user.isAdmin;
    isAdmin = true;
    return (
      <Page>
        <Header />
        <MyRow style={{ backgroundColor: 'pink' }}>
          {' '}
          <SurveysTitle>Surveys</SurveysTitle>
          <Space />
          {isAdmin ? (
            <Link to="/createSurvey" style={{ textDecoration: 'none' }}>
              {' '}
              <AddButton>
                <div
                  style={{
                    color: 'white',
                    fontSize: 27,
                    paddingTop: 1,
                    paddingLeft: 8,
                    fontWeight: 500,
                  }}
                >
                  ＋
                </div>
              </AddButton>
            </Link>
          ) : null}
        </MyRow>
        <MyRow style={{ backgroundColor: 'lightYellow' }}>
          <StatusButton>Active</StatusButton>
          <StatusButton style={{ backgroundColor: 'white' }}>
            Closed
          </StatusButton>
        </MyRow>

        {survey.surveys.map((s, i) => (
          <Thumb key={i} survey={s} />
        ))}
        <Button onClick={() => survey.load()}>Load</Button>
        <Button onClick={() => survey.loadMore()}>Load More</Button>
        {survey.loading ? <div>Loading...</div> : null}
      </Page>
    );
  })
);
