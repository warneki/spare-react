import React from 'react';
import { Row, Col} from 'reactstrap';


const Session = (props) => {
  // TODO: save timestamp in db, parse it nicely here
  // {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day:'2-digit'}).format(new Date(Date.parse(comment.updatedAt)))}

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
