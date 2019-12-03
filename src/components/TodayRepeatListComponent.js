import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Repeat from './RepeatComponent';
import { Loading } from './LoadingComponent';


function TodayRepeatList(props) {
  // console.log(JSON.stringify(props));
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

  if (props.repeats.todayRepeats === undefined || props.repeats.todayRepeats.length == 0) {
    return (
      <Row className="mt-2">
        <Col>
          There is nothing to repeat today.
        </Col>
      </Row>
    );
  }

  const todays_repeats_list = props.repeats.todayRepeats
    .map((repeat) => {
      const repeat_session = props.sessions.filter((session) => {
        return session.id === repeat.session_id;
      })[0];
      return (
        <Repeat
          repeat={repeat}
          session={repeat_session}
          key={repeat.id.toString()} />
      );
    });

  return (
    <Container>
      <Row className="mb-2">
        <Col >
          To repeat Today:
        </Col>
      </Row>

      { todays_repeats_list }
    </Container>
  );

}


export default TodayRepeatList;
