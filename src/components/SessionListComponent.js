import React from 'react';
import Session from './SessionComponent';
import { Loading } from './LoadingComponent';


function SessionList(props) {
  if (props.sessions.isLoading) {
    return(
      <Loading />
    );
  }

  if (props.sessions.errMess) {
    return(
      <h4>{props.sessions.errMess}</h4>
    );
  }

  return props.sessions.map((session) => {
    if (session == null) {
      return <span></span>;
    }
    return (<Session session={session} key={session.id.toString()} />);
  });

};



export default SessionList;
