import React, { Component, useState } from 'react';
import { Row, Col, Button, Collapse, CardBody, Card } from 'reactstrap';


const Repeat = (props) => {
  const days_ago_phrase = props.repeat.days === 0 ? "today" :
    (props.repeat.days === 1 ? "yesterday" : props.repeat.days + " days ago");


  return (
    <Row className="mt-2">

      <Col md="7"  xs="12">
        {props.session.project}: {props.session.description}
      </Col>

      <Col md="5"  xs="12">
        Studied {days_ago_phrase}
      </Col>

    </Row>
  );

}


export default Repeat;
