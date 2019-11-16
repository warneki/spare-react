import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Session from './SessionComponent';


class SessionList extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return this.props.sessions.map((session) => {
      return (
        <Session session={session} key={session.id.toString()} />
      );
    });
  }

}


export default SessionList;
