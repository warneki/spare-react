import * as ActionTypes from './ActionTypes';
import {putRepeatsIntoSession} from './ActionCreators';
import { serverURL } from '../shared/config';
import moment from 'moment';


// <--- fetchRepeats --->
export const fetchTodayRepeats = () => (dispatch) => {
  dispatch(repeatsLoading(true));

  return fetch(serverURL + 'repeats')
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
    .then(response => dispatch(repeatsLoadSuccess(response)))
    .catch(error => dispatch(repeatsLoadFailed(error.message)));
}

export const repeatsLoading = () => ({
  type: ActionTypes.TODAY_REPEATS_LOADING
});

export const repeatsLoadFailed = (errmess) => ({
  type: ActionTypes.TODAY_REPEATS_LOADING_FAILED,
  error: errmess
});

export const repeatsLoadSuccess = (repeats) => ({
    type: ActionTypes.TODAY_REPEATS_RECEIVED,
    repeats: repeats
});


// <--- generate new repeats when session added --->

const DAYS_OFFSETS = [0, 1, 9, 25, 55, 131, 241];

export const addRepeatsForNewSession = (session) => (dispatch) => {

  const repeats = DAYS_OFFSETS.map(days => {
    const session_created = moment(session.date);
    return {
      "done": false,
      "days": days,
      "session_id": session.id,
      "repeat_on": session_created.add(days, 'days').format('YYYY-MM-DD'),
  }});

  // console.log(JSON.stringify(repeats));

  return fetch(serverURL + 'repeats', {
    method: 'POST',
    body: JSON.stringify(repeats),
    headers: {
      'Content-Type': 'application/json',
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
  .then(repeats => {
    dispatch(repeatsSuccessfullyCreated(repeats));
    dispatch(putRepeatsIntoSession(repeats, session));
  })
  .catch(error => console.log('Post repeats failed: ', error.message))
}

export const repeatsSuccessfullyCreated = (repeats) => ({
  type: ActionTypes.CREATED_REPEATS,
  repeats: repeats
});
