import React, { Component, useState } from 'react';
import { Row, Col, Button, Collapse, CardBody, Card } from 'reactstrap';
import SessionList from './SessionListComponent'


const Project = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const project_sessions = props.project['study sessions'].map(
    (session_id) => props.sessions[session_id]
  );

  return (
    <Row className="mt-2">
      <Col >
        <Button color="primary" onClick={toggle} outline block className="text-left">
          {props.project.name}
        </Button>
        <Collapse isOpen={isOpen} block="true">
          <Card >
            <CardBody>
              <div>
                Notes in: {props.project['notes location']}
              </div>
              <SessionList sessions={project_sessions} />
            </CardBody>
          </Card>
        </Collapse>
      </Col>
    </Row>
  );

}


export default Project;
