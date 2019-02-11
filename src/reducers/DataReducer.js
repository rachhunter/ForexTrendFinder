//Data related reducer - related to 'Daily' screen
import {
  DAILY_DATE_UPDATE,
  DAILY_FETCH_SUCCESS,
  DAILY_FORMAT_DATE,
  DAILY_DATA_FAIL
} from '../actions/types';

const INITIAL_STATE = {
  date: '',
  list: [],
  formatDate: '',
  dailyError: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DAILY_DATE_UPDATE:
      return { ...state, date: action.payload };
    case DAILY_FETCH_SUCCESS:
      return { ...state, list: action.payload };
    case DAILY_FORMAT_DATE:
      return { ...state, formatDate: action.payload };
    case DAILY_DATA_FAIL:
      return { ...state, dailyError: action.payload };
    default:
      return state;
  }
};
