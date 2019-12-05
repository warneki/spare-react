import * as ActionTypes from './ActionTypes';

export const Repeats = (state = {
    isLoading: true,
    errMess: null,
    todayRepeats: [],
    learnedToday: []
  }, action) => {

  switch(action.type) {

    case ActionTypes.TODAY_REPEATS_RECEIVED:
      const today = new Date().toISOString().slice(0, 10);
      const todayRepeats = action.repeats.filter((repeat) => {
        return repeat.repeat_on === today;
      });

      const toRepeatToday = todayRepeats.filter((repeat) => {
        return repeat.days !=0;
      });
      const learnedToday = todayRepeats.filter((repeat) => {
        return repeat.days ===0;
      });

      return {...state, isLoading: false, errMess: null, todayRepeats: toRepeatToday, learnedToday: learnedToday};

    case ActionTypes.TODAY_REPEATS_LOADING:
      return {...state, isLoading: true, errMess: null, todayRepeats: [], learnedToday: []};

    case ActionTypes.TODAY_REPEATS_LOADING_FAILED:
      return {...state, isLoading: false, errMess: action.error, todayRepeats: [], learnedToday: []};

    case ActionTypes.CREATED_REPEATS:
      const newLearnedTodayItem = action.repeats.filter((repeat) => repeat.days === 0)[0];
      return {...state, learnedToday: [...state.learnedToday, newLearnedTodayItem] };

    default:
      return state;
  }
}
