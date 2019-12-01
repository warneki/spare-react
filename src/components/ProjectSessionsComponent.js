import SessionList from './SessionListComponent'
import React from 'react';
import { Row, Col } from 'reactstrap';


const ProjectSession = (props) => {
  if (props.sessions === undefined || props.sessions.length == 0) {
    return (
      <Row className="mt-2">
        <Col>
          You have no study sessions for this project yet
        </Col>
      </Row>
    );
  } else {
    return (
      <SessionList sessions={props.sessions} />
    );
  }
}


export default ProjectSession;
