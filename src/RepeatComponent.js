import React, { Component, useState } from 'react';
import { Row, Col, Button, Collapse, CardBody, Card } from 'reactstrap';


const Repeat = (props) => {
  return (
    <Row className="mt-2">

      <Col md="7"  xs="12">
        {props.session.project}: {props.session.description}
      </Col>

      <Col md="5"  xs="12">
        Studied {props.repeat.days} days ago
      </Col>

    </Row>
  );

}


export default Repeat;
