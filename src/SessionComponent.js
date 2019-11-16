import React, { Component, useState } from 'react';
import { Row, Col, Button, Collapse, CardBody, Card } from 'reactstrap';


const Session = (props) => {
  return (
    <Row className="mt-2">
      <Col >
        Studied on {props.session.date}
      </Col>
      <Col >
        {props.session.description}
      </Col>
    </Row>
  );

}


export default Session;
