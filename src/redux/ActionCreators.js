import * as ActionTypes from './ActionTypes';
import addRepeatsForNewSession from './repeatsActionCreators';
import { serverURL } from '../shared/config';


// <--- fetchProjects --->

export const fetchProjects = () => (dispatch) => {
  dispatch(projectsLoading(true));

  return fetch(serverURL + 'projects')
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
    .then(projects => dispatch(projectsLoadedSuccess(projects)))
    .catch(error => dispatch(projectsLoadFailed(error.message)));
}

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

export const fetchSessions = () => (dispatch) => {
  dispatch(sessionsLoading());

  return fetch(serverURL + 'sessions')
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
    .then(sessions => dispatch(sessionsLoadedSuccess(sessions)))
    .catch(error => dispatch(sessionsLoadFailed(error.message)));
}

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
  session: session
});

export const postNewSession = (form) => (dispatch) => {
  const newSession = {...form,
    date: new Date().toISOString().slice(0, 10),
  };

  // const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(serverURL + 'sessions', {
    method: 'POST',
    body: JSON.stringify(newSession),
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
  .then(response => dispatch(sessionSuccessfullyCreated(response)))
  .then(response => {
    dispatch(putSessionIntoProject(response.session.id, response.session.project))
      .then(projects => dispatch(updateProjectWithNewSession(projects, response.session)))
  })
  .catch(error => {
    console.log('Post session failed: ', error.message);
    alert('Your session was not saved =(\nError: '+ error.message);
  })
}


// <--- putSessionIntoProject ---> [TODO: STUB TILL NORMAL DB]

export const addedSessionToProject = (project) => ({
  type: ActionTypes.UPDATED_PROJECT,
  project: project
});

export const putSessionIntoProject = (session_id, project_name) => (dispatch) => {
  return fetch(serverURL + 'projects')
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
    .then(projects => {
      return projects;
    })
    .catch(error => {
      console.log('Add session to project failed: ', error.message);
    });
  }

export const updateProjectWithNewSession = (projects, session) => (dispatch) => {
  var project = projects.filter((project) => project.name === session.project)[0];

  project.study_sessions.push(session.id);
  // const bearer = 'Bearer ' + localStorage.getItem('token');

  return fetch(serverURL + 'projects/' + project.id.toString(), {
    method: 'PUT',
    body: JSON.stringify(project),
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
  .then(response => dispatch(addedSessionToProject(response)))
}
