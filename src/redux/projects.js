import * as ActionTypes from './ActionTypes';

export const Projects = (state = {
    isLoading: true,
    errMess: null,
    projects: []
  }, action) => {
  switch(action.type) {
    case ActionTypes.PROJECTS_RECEIVED:
      return {...state, isLoading: false, errMess: null, projects: action.projects};

    case ActionTypes.PROJECTS_LOADING:
      return {...state, isLoading: true, errMess: null, projects: []};

    case ActionTypes.PROJECTS_LOADING_FAILED:
      return {...state, isLoading: false, errMess: action.error, projects: []};

    case ActionTypes.UPDATED_PROJECT:
      return {...state, projects: state.projects.map(
           (prjt) => prjt.id === action.project.id ?
                {...prjt, study_sessions: action.project.study_sessions} :
                prjt
       )};

    default:
      return state;
  }
}
