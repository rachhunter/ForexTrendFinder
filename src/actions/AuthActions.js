//Authentication related actions - related to 'Register', 'Login' and 'Logout' screens
import * as firebase from 'firebase';
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
} from './types';

export const firstnameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const lastnameChanged = (text) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text
  };
};


export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const confirmPwdChanged = (text) => {
  return {
    type: CONFIRM_PWD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    testLoginDetails(dispatch, email, password);
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    firebase.auth().signOut()
    .then(dispatch({ type: LOGOUT_USER }))
    .catch((error) => {
      const { code, message } = error;
      console.log(code + message);
    });
  };
};

export const registerUser = ({ email, password, passwordconfirm, firstname, lastname }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    testRegisterDetails(dispatch, email, password, passwordconfirm, firstname, lastname);
  };
};

export const createUserFB = (dispatch, email, password, firstname, lastname) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    // when Firebase returns a user, manually dispatch the user to Redux via 'loginUserSuccess'
    .then(user => loginUserSuccess(dispatch, user))
    .then(() => saveNewUserFB(dispatch, email, firstname, lastname))
    .catch((error) => {
      //catch two authentication fail promises from firebase - returns a 'code' and a 'message'
      const { code, message } = error;
      //dispatch the two authentication fail promises from firebase and
      //'code' goes to payload for LOGIN_USER_FAIL
      registerUserFail(dispatch, code, message);
    });
};

export const saveNewUserFB = (dispatch, email, firstname, lastname) => {
  databaseSave(dispatch);
  //save user profile values in Firebase or catch error returned
  const { currentUser } = firebase.auth();
  firebase.database().ref(`/users/${currentUser.uid}`).set({
    email: email,
    f_name: firstname,
    l_name: lastname,
  })
    .then(dispatch(databaseSaveSuccess))
    .catch((dberr) => {
      const { code, message } = dberr;
      databaseSaveFail(dispatch, code, message);
    });
};

export const loginFB = (dispatch, email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(user => loginUserSuccess(dispatch, user))
    .catch((error) => {
      const { code, message } = error;
      loginUserFail(dispatch, code, message);
    });
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: LOGIN_USER_FAIL,
    payload: error
  });
};

const registerUserFail = (dispatch, error) => {
  dispatch({
    type: REGISTER_USER_FAIL,
    payload: error
  });
};

const databaseSaveFail = (dispatch, dberr) => {
  dispatch({
    type: DATABASE_SAVE_FAIL,
    payload: dberr
  });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const databaseSaveSuccess = (dispatch) => {
  dispatch({
    type: DATABASE_SAVE_SUCCESS,
  });
};

const databaseSave = (dispatch) => {
  dispatch({
    type: DATABASE_SAVE
  });
};

const testLoginDetails = (dispatch, email, password) => {
  let test = null;
  const emailmatch = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  switch (true) {
    case (email.length === 0) : //fall through
    case (password.length === 0) : //fall through
      test = 'Complete empty fields';
      loginUserFail(dispatch, test);
      break;
    case (!emailmatch.test(email)) : //check email format;;
      test = 'Enter a valid email address';
      loginUserFail(dispatch, test);
      break;
    case (password.length < 6) : //min length for Firebase
      test = 'Password entered is wrong';
      loginUserFail(dispatch, test);
      break;
    default:
      //if all cases fail, then dispatch email and password to Firebase and attempt to login
      return loginFB(dispatch, email, password);
  }
};

//
const testRegisterDetails = (dispatch, email, password, passwordconfirm, firstname, lastname) => {
  let test = null;
  //first & last name to include only letters, hyphen & space, with length 2 to 16 characters incl
  const namematch = /^[A-Za-z- ]{2,16}$/;

  //test that email address is in the correct format
  const emailmatch = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //test for password
  //min 2 digits, 1 special character, min 8 length
  const pwordmatch = /^(?=.*?[0-9].*?[0-9])(?=.*[!@#$%])[0-9a-zA-Z!@#$%0-9]{8,}$/;

  //test register form for input errors
  //switch true means continue through cases
  switch (true) {
    case (firstname.length === 0) : //fall through
    case (lastname.length === 0) : //fall through
    case (email.length === 0) : //fall through
    case (password.length === 0) : //fall through
    case (passwordconfirm.length === 0) :
      test = 'Complete empty fields';
      loginUserFail(dispatch, test);
      break;
    case (firstname.length < 2) : //fall through
    case (lastname.length < 2) : //fall through
      test = 'Names - at least 2 characters';
      loginUserFail(dispatch, test);
      break;
    case (!namematch.test(firstname)) :
      test = 'First name - only letters, hyphen and spaces';
      loginUserFail(dispatch, test);
      break;
    case (!namematch.test(lastname)) :
      test = 'Last name - only letters, hyphen and spaces';
      loginUserFail(dispatch, test);
      break;
    case (!emailmatch.test(email)) :
      test = 'Enter a valid email address';
      loginUserFail(dispatch, test);
      break;
    case (password.length < 8) :
      test = 'Password must be at least 8 characters';
      loginUserFail(dispatch, test);
      break;
    case (!pwordmatch.test(password)) :
      test = 'Password - min two digits & one !@#$%';
      loginUserFail(dispatch, test);
      break;
    case (password !== passwordconfirm) :
      test = 'Your passwords do not match';
      loginUserFail(dispatch, test);
      break;
    default:
      return createUserFB(dispatch, email, password, firstname, lastname);
  }
};
