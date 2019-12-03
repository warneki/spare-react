import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { postNewSession, fetchProjects, fetchSessions } from '../redux/ActionCreators';
import { fetchTodayRepeats } from '../redux/repeatsActionCreators';
import ProjectsList from './ProjectsListComponent';
import InputSession from './InputSessionComponent';
import TodayRepeatList from './TodayRepeatListComponent';


const mapStateToProps = state => {
  return {
    projects: state.projects,
    repeats: state.repeats,
    sessions: state.sessions.sessions,
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchProjects: () => {dispatch(fetchProjects())},
  fetchTodayRepeats: () => {dispatch(fetchTodayRepeats())},
  fetchSessions: () => {dispatch(fetchSessions())},
  resetNewSessionForm: () => { dispatch(actions.reset('new_study_session'))},
  postNewSession: (new_session) => dispatch(postNewSession(new_session)),
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchSessions();
    this.props.fetchProjects();
    this.props.fetchTodayRepeats();
  }

  render() {
    const MainView = () => {

      return(
        <Container>
          <ProjectsList
            projects={this.props.projects}
            sessions={this.props.sessions}
          />
          <InputSession
            projects={this.props.projects}
            resetNewSessionForm={this.props.resetNewSessionForm}
            postNewSession={this.props.postNewSession}
          />
          <TodayRepeatList
            repeats={this.props.repeats}
            sessions={this.props.sessions}
          />
        </Container>
      );
    }

    return (
      <div>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Redirect to="/" />
        </Switch>
      </div>
    )
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
