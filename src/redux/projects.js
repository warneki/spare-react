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
           (prjt) => prjt._id === action.project._id ?
               // TODO: can we do it some other way; does it influence which components rerender?
               // {...prjt, study_sessions: [...state.study_sessions, action.session._id] } :
                {...prjt, study_sessions: action.project.study_sessions} :
                prjt
       )};

    default:
      return state;
  }
};
