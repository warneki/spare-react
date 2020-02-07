import * as ActionTypes from './ActionTypes';
import {putRepeatsIntoSession} from './ActionCreators';
import { serverURL } from '../shared/config';
import moment from 'moment';


// <--- fetchRepeats --->

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
