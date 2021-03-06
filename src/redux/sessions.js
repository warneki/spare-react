import * as ActionTypes from './ActionTypes';

export const Sessions = (state = {
    isLoading: true,
    errMess: null,
    sessions: []
  }, action) => {
    switch(action.type) {
      case ActionTypes.SESSIONS_RECEIVED:
        return {...state, isLoading: false, errMess: null, sessions: action.sessions};

      case ActionTypes.SESSIONS_LOADING:
        return {...state, isLoading: true, errMess: null, sessions: []};

      case ActionTypes.SESSIONS_LOADING_FAILED:
        return {...state, isLoading: false, errMess: action.error, sessions: []};

      case ActionTypes.CREATED_SESSION:
        return {...state, sessions: state.sessions.concat(action.session)};

      default:
        return state;
    }
  }
