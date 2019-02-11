//Authentication related reducer - related to 'Register', 'Login' and 'Logout' screens
import {
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  CONFIRM_PWD_CHANGED,
  REGISTER_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
  DATABASE_SAVE,
  DATABASE_SAVE_SUCCESS,
  DATABASE_SAVE_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  firstname: '',
  lastname: '',
  passwordconfirm: '',
  user: null,
  error: '',
  loading: false,
  dberr: ''
};

export default (state = INITIAL_STATE, action) => {
  // view Redux actions in the console
  console.log(action);

  switch (action.type) {
    case FIRST_NAME_CHANGED:
      return { ...state, firstname: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, lastname: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case CONFIRM_PWD_CHANGED:
      return { ...state, passwordconfirm: action.payload };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        password: '',
        passwordconfirm: '',
        error: action.payload,
        loading: false
      };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        password: '',
        passwordconfirm: '',
        error: '',
        loading: false,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        password: '',
        passwordconfirm: '',
        error: action.payload,
        loading: false
      };
    case LOGOUT_USER:
      return INITIAL_STATE;

    case DATABASE_SAVE:
      return {
        ...state, loading: true
      };
    case DATABASE_SAVE_SUCCESS:
      return {
        ...state, loading: false
      };
    case DATABASE_SAVE_FAIL:
      return {
        ...state,
        dberr: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
