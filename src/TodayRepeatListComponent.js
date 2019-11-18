import React, { Component } from 'react';
import { Container, Col, Row } from 'reactstrap';
import Repeat from './RepeatComponent';


class TodayRepeatList extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    if (this.props.repeats) {

      const todays_repeats_list = this.props.repeats
        .filter((repeat) => {
          return repeat.days != 0;
        })
        .map((repeat) => {
          return (
            <Repeat
              repeat={repeat}
              session={this.props.sessions[repeat.session_id]} key={repeat.id.toString()} />
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

    return (
      <Container>
        <Row className="mb-2">
          <Col >
            There is nothing to repeat today!
          </Col>
        </Row>
      </Container>
    );

  }

}


export default TodayRepeatList;
