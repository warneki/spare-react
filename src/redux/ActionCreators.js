import * as ActionTypes from './ActionTypes';
import {addRepeatsForNewSession, repeatsLoadFailed, repeatsLoading, repeatsLoadSuccess} from './repeatsActionCreators';
import { serverURL } from '../shared/config';


// <--- fetchEverything --->

export const fetchTodayRepeatsSessionsProjects = () => (dispatch) => {
  dispatch(projectsLoading());
  dispatch(sessionsLoading());
  dispatch(repeatsLoading());

  return fetch(serverURL + 'api/today')
    .then(response => {
      if (response.ok) {
        return response;
      }
      else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }},
      error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => {
      dispatch(sessionsLoadedSuccess(response.sessions));
      dispatch(projectsLoadedSuccess(response.projects));
      dispatch(repeatsLoadSuccess(response.repeats));
    })
    .catch(error => {
      dispatch(projectsLoadFailed(error.message));
      dispatch(sessionsLoadFailed(error.message));
      dispatch(repeatsLoadFailed(error.message));
    });
};

export const projectsLoading = () => ({
  type: ActionTypes.PROJECTS_LOADING
});

export const projectsLoadFailed = (errmess) => ({
  type: ActionTypes.PROJECTS_LOADING_FAILED,
  error: errmess
});

export const projectsLoadedSuccess = (projects) => ({
    type: ActionTypes.PROJECTS_RECEIVED,
    projects: projects
});


// <--- fetchSessions --->

export const sessionsLoading = () => ({
  type: ActionTypes.SESSIONS_LOADING
});

export const sessionsLoadFailed = (errmess) => ({
  type: ActionTypes.SESSIONS_LOADING_FAILED,
  error: errmess
});

export const sessionsLoadedSuccess = (sessions) => ({
  type: ActionTypes.SESSIONS_RECEIVED,
  sessions: sessions
});



// <--- Create session --->

export const sessionSuccessfullyCreated = (session) => ({
  type: ActionTypes.CREATED_SESSION,
  session: session,
});

export const postNewSession = (form) => (dispatch) => {
  // const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(serverURL + 'sessions', {
    method: 'POST',
    body: JSON.stringify(form),
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': bearer
    },
    credentials: 'same-origin'
  })
  .then(response => {
    if (response.ok) {
      return response;
    }
    else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }},
    error => {
      var errmess = new Error(error.message);
      throw errmess;
    })
  .then(response => response.json())
  .then(response => dispatch(sessionSuccessfullyCreated(response.session))
      .then(dispatch(updateProjectWithNewSession(response.project))
          .then(dispatch(addRepeatsForNewSession(response.repeats)))
      )
  )
  .catch(error => {
    console.log('Post session failed: ', error.message);
    alert('Your session was not saved =(\nError: '+ error.message);
  });
};

export const updateProjectWithNewSession = (project) => ({
  type: ActionTypes.UPDATED_PROJECT,
  project: project
});
