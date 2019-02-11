/* This is the code from Google App Script written in JavaScript
   It analyses raw data to rank currencies strongest to weakest and sends results from Google Sheets to Google’s Firebase.
*/

/* Run function "startDailySync" to send Daily data to Firebase
   Remove database secret from "function getFirebaseUrl(jsonPath)" when sharing - add your own at Line 162
*/

// initialize global variables
var data = '';
var dateRangeData = '';
var day = '';
var month = '';
var year = '';
var convertedMonth = 0;

var dataToImport = {
  AUD: 0,
  CAD: 0,
  CHF: 0,
  EUR: 0,
  GBP: 0,
  JPY: 0,
  NZD: 0,
  USD: 0
};

// function to get the daily data from the spreadsheet
function getDailySpreadsheetData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Daily');
  var range = sheet.getRange('A2:C29');
  var dateRange = sheet.getRange('B1:B1');

  data = range.getValues();
  dateRangeData = dateRange.getValue();

  return data, dateRangeData;
}

// function to split date into day, month, year
function splitDate(dateRangeData) {
  //Google Sheets saves dates as numbers, so convert to string
  var date = dateRangeData.toString();
  Logger.log('date = '+ date);

  // day, month, year are initialized global variables
  day = date.split(' ')[2];
  month = date.split(' ')[1];
  year = date.split(' ')[0];
  Logger.log('day = '+ day);
  Logger.log('month = '+ month);
  Logger.log('year = ' + year);

  return day, month, year;
}

// function to convert text month to month number
function convertMonth(month) {
  if (month === 'Jan') {
    convertedMonth = 1;
    return convertedMonth;
  } else if (month === 'Feb') {
    convertedMonth = 2;
    return convertedMonth;
  } else if (month === 'Mar') {
    convertedMonth = 3;
    return convertedMonth;
  } else if (month === 'Apr') {
    convertedMonth = 4;
    return convertedMonth;
  } else if (month === 'May') {
    convertedMonth = 5;
    return convertedMonth;
  } else if (month === 'Jun') {
    convertedMonth = 6;
    return convertedMonth;
  } else if (month === 'Jul') {
    convertedMonth = 7;
    return convertedMonth;
  } else if (month === 'Aug') {
    convertedMonth = 8;
    return convertedMonth;
  } else if (month === 'Sep') {
    convertedMonth = 9;
    return convertedMonth;
  } else if (month === 'Oct') {
    convertedMonth = 10;
    return convertedMonth;
  } else if (month === 'Nov') {
    convertedMonth = 11;
    return convertedMonth;
  } else if (month === 'Dec') {
    convertedMonth = 12;
    return convertedMonth;
  } else {
    Logger.log('error converting month to number');
  }
}

// function to calculate the data to save to Firebase
function calcDataToImport(data) {
  // initialize local variables
  var i = 0;
  var pair = '';
  var pair1 = '';
  var pair2 = '';
  var price1 = '';
  var price2 = '';
  var diff = 0;
  //var currency = '';

  // loop to convert data to currency ranking
  for (i; i < data.length; i++) {
    pair = data[i][0];
    pair1 = pair.slice(0, 3);
    pair2 = pair.slice(-3);
    price1 = data[i][1];
    price2 = data[i][2];
    diff = parseInt((price1 - price2) * 100000, 10);

    // input individual currencies and direction to calculate count for currency ranking
    calculateCurrency(diff, pair1, pair2, pair);
  }
}

// function to determine stronger currency in currency pair
function calculateCurrency(diff, pair1, pair2, pair) {
  var currency = '';
  var currencyCount = '';

  if (diff > 0) {
    currency = pair1;
    currencyCount++;
    Logger.log(currencyCount + ': ' + currency + ' = up');
    parseInt(dataToImport[currency]++, 10);
    Logger.log(dataToImport[currency]);
    return dataToImport;
  } else if (diff < 0) {
    currency = pair2;
    currencyCount++;
    Logger.log(currencyCount + ': ' + currency + ' = up');
    parseInt(dataToImport[currency]++, 10);
    Logger.log(dataToImport[currency]);
    return dataToImport;
  } else if (diff === 0) {
    currencyCount++;
    Logger.log(currencyCount + ': ' + pair1 + ' & ' + pair2 + ' are equal');
  } else {
    Logger.log(pair + ' = error');
  }
}

// return the jsonPath to access Firebase
function getFirebaseUrl(jsonPath) {
  /*
  We then make a URL builde' = error'
  This takes in a path, and returns a URL that updates the data in that path
  */

  //Private database secret
  var secret = 'ADD YOUR OWN FIREBASE DATABASE SECRET HERE';

  return (
    'https://forex-trend-finder.firebaseio.com/' +
    '/daily/' +
    jsonPath +
    '.json?auth=' +
    secret
  );
}

// sync the JSON results to Firebase with the date as a reference
function syncSheet() {
  /*
  We make a PUT (update) request and send a JSON payload
  More info on the REST API here : https://firebase.google.com/docs/database/rest/start
  */

  var options = {
    method: 'put',
    contentType: 'application/json',
    payload: JSON.stringify(dataToImport)
  };

  var ref = year + '-' + convertedMonth + '-' + day;

  var fireBaseUrl = getFirebaseUrl(ref);

  /*
  We use the UrlFetchApp google scripts module
  More info on this here : https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app
  */
  UrlFetchApp.fetch(fireBaseUrl, options);
}

// main function to run
function startDailySync() {
  // get data from active Google spreadsheet
  getDailySpreadsheetData();

  // split date into day + month + year
  splitDate(dateRangeData);

  // convert month from text to number
  convertMonth(month);

  // calculate the data to import to Firebase
  calcDataToImport(data);

  Logger.log('dataToImport = ' + JSON.stringify(dataToImport, null, 4));

  //Use the syncMasterSheet function defined before to push this data to the
  //"masterSheet" key in the firebase database
  syncSheet(dataToImport);
}
