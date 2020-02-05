import * as ActionTypes from './ActionTypes';
import moment from 'moment';


export const Repeats = (state = {
    isLoading: true,
    errMess: null,
    todayRepeats: [],
    learnedToday: []
  }, action) => {

  switch(action.type) {

    case ActionTypes.TODAY_REPEATS_RECEIVED:
      const today = moment().format('DD-MM-YYYY');
      // let yesterday = moment().add(1, 'day').format('DD-MM-YYYY');
      const todayRepeats = action.repeats ? action.repeats.filter((repeat) => {
        // Todo: same_day function; filter in 2 groups
        let repeat_on = moment(repeat.repeat_on).format('DD-MM-YYYY');
        return repeat_on === today;
      }) : [];

      const toRepeatToday = todayRepeats.filter((repeat) => {
        return repeat.days !==0;
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
};
