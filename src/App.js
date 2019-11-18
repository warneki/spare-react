import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.css";
import { PROJECTS } from './db_stub/projects_example';
import { SESSIONS } from './db_stub/sessions_example';
import { REPEATS } from './db_stub/repeats';
import ProjectList from './ProjectListComponent';
import TodayRepeatList from './TodayRepeatListComponent';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      projects: PROJECTS,
      sessions: SESSIONS,
      repeats: REPEATS,
      today: new Date().toISOString().slice(0, 10),
    };
  }

  render(){
    return(
      <div className="App">

        <ProjectList
          projects={this.state.projects}
          sessions={this.state.sessions}
        />

        <TodayRepeatList
          repeats={this.state.repeats[this.state.today]}
          sessions={this.state.sessions}
        />

      </div>
    );
  }

}


export default hot(module)(App);
