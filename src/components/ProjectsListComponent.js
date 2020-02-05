import React from 'react';
import Project from './ProjectComponent';
import { Loading } from './LoadingComponent';

function ProjectsList(props) {
  if (props.projects.isLoading) {
    return(
      <Loading />
    );
  }

  if (props.projects.errMess) {
    return(
      <h4>{props.projects.errMess}</h4>
    );
  }

  return props.projects.projects.map((project) => {
    return (
      <Project project={project} sessions={props.sessions} key={project._id.toString()} />
    );
  });
}


export default ProjectsList;
