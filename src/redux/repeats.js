import * as ActionTypes from './ActionTypes';

export const Repeats = (state = {
    isLoading: true,
    errMess: null,
    todayRepeats: []
  }, action) => {
  switch(action.type) {
    case ActionTypes.TODAY_REPEATS_RECEIVED:
      const today = new Date().toISOString().slice(0, 10);
      const todayRepeats = action.repeats.filter((repeat) => {
        return repeat.repeat_on === today && repeat.days !=0;
      });
      return {...state, isLoading: false, errMess: null, todayRepeats: todayRepeats};

    case ActionTypes.TODAY_REPEATS_LOADING:
      return {...state, isLoading: true, errMess: null, todayRepeats: []};

    case ActionTypes.TODAY_REPEATS_LOADING_FAILED:
      return {...state, isLoading: false, errMess: action.error, todayRepeats: []};

    default:
      return state;
  }
}
