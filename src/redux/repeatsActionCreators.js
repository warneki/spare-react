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

export const addRepeatsForNewSession = (repeats) => ({
    type: ActionTypes.CREATED_REPEATS,
    repeats: repeats
});
