import React, { Component, useState } from 'react';
import { Row, Col, Button, Collapse, CardBody, Card } from 'reactstrap';


const Project = (props) => {

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Row className="mt-2">
      <Col >
        <Button color="primary" onClick={toggle} outline block className="text-left">
          {props.project.name}
        </Button>
        <Collapse isOpen={isOpen} block="true">
          <Card >
            <CardBody>
              Notes: {props.project['notes location']}
            </CardBody>
          </Card>
        </Collapse>
      </Col>
    </Row>
  );

}


export default Project;
