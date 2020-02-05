import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Repeat from './RepeatComponent';
import { Loading } from './LoadingComponent';


function LearnedTodayList(props) {
  if (props.repeats.isLoading) {
    return(
      <Loading />
    );
  }

  if (props.repeats.errMess) {
    return(
      <h4>{props.repeats.errMess}</h4>
    );
  }

  if (props.repeats.learnedToday === undefined || props.repeats.learnedToday.length == 0) {
    return (
      <Row className="mt-2">
        <Col>
          You have not learned anything today yet, go feed your brain!
        </Col>
      </Row>
    );
  }

  const learned_today_list = props.repeats.learnedToday
    .map((item) => {
      const item_session = props.sessions.filter((session) => {
        return session._id === item.session_id;
      })[0];
      return (
        <Repeat
          repeat={item}
          session={item_session}
          key={item._id.toString()} />
      );
    });

  return (
    <Container>
      <Row className="mb-2">
        <Col >
          <h4>Things you've learned today:</h4>
        </Col>
      </Row>

      { learned_today_list }
    </Container>
  );

}


export default LearnedTodayList;
