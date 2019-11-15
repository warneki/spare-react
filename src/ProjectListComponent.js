import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Project from './ProjectComponent';


class ProjectList extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const projects_list = this.props.projects.map((project) => {
      return (
        <Project project={project} key={project.id.toString()} />
      );
    });

    return (
      <Container>
        { projects_list }
      </Container>
    );
  }

}


export default ProjectList;
