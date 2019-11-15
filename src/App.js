import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import { PROJECTS } from './db_stub/projects_example';
import ProjectList from './ProjectListComponent';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      projects: PROJECTS
    };
  }

  render(){
    return(
      <div className="App">
        <ProjectList projects={this.state.projects} />
      </div>
    );
  }

}


export default hot(module)(App);
