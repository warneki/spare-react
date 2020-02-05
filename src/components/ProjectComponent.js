import React, { useState } from 'react';
import { Row, Col, Button, Collapse, CardBody, Card } from 'reactstrap';

import ProjectSessions from './ProjectSessionsComponent'


const Project = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const project_sessions = props.sessions ?
      props.sessions.filter((sessn) => props.project.study_sessions.includes(sessn._id)) : [];

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
                Notes in: {props.project.notes_location}
              </div>
              <ProjectSessions sessions={project_sessions} />
            </CardBody>
          </Card>
        </Collapse>
      </Col>
    </Row>
  );

}


export default Project;
