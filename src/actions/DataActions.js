//Data related actions - related to 'Daily' screen
import * as firebase from 'firebase';
import {
  DAILY_DATE_UPDATE,
  DAILY_FETCH_SUCCESS,
  DAILY_FORMAT_DATE
} from './types';

//retreive lastest date to display
export const dailyDateFetch = () => {
  const dateRef = firebase.database().ref(`/latest/daily`);
  let date = 'Loading'; //date format from Google Sheets is yyyy-m(m)-d(d)
  return (dispatch) => {
    dateRef.on(('value'), snapshot => {
      date = snapshot.val();
      dispatch({ type: DAILY_DATE_UPDATE, payload: date.date });
      dailyFetch(dispatch, date.date);
    });
  };
};

//retrieve data for the latest date
export const dailyFetch = (dispatch, date) => {
  const dataDate = date.toString();
  const dailyRank = firebase.database().ref(`/daily/${dataDate}`);
  dailyRank.orderByValue().on('value', snapshot => {
    const data = [];
    snapshot.forEach((child) => {
      data.push({
        id: child.key,
        currency: child.key,
        rank: child.val(),
      });
    });
    dispatch({ type: DAILY_FETCH_SUCCESS, payload: data });
    formatDate(dispatch, dataDate);
  });
};

//format the date to display, showing month in words for improved clarity
export const formatDate = (dispatch, dataDate) => {
  if (dataDate !== 'Loading') {
    const tempDate = dataDate;
    const [year, month, date] = tempDate.split('-');
    let newMonth = '';
    switch (month) {
      case '1':
        newMonth = 'Jan';
        break;
      case '2':
        newMonth = 'Feb';
        break;
      case '3':
        newMonth = 'Mar';
        break;
      case '4':
        newMonth = 'Apr';
        break;
      case '5':
        newMonth = 'May';
        break;
      case '6':
        newMonth = 'Jun';
        break;
      case '7':
        newMonth = 'Jul';
        break;
      case '8':
        newMonth = 'Aug';
        break;
      case '9':
        newMonth = 'Sep';
        break;
      case '10':
        newMonth = 'Oct';
        break;
      case '11':
        newMonth = 'Nov';
        break;
      case '12':
        newMonth = 'Dec';
        break;
      default:
        console.log('error calculating newMonth');
      }
    const newDate = `${date} ${ newMonth} ${ year}`;
    dispatch({ type: DAILY_FORMAT_DATE, payload: newDate });
  }
};
