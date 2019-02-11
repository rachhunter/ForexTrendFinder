//Styles for the entire App => individual files reference this list for all styling
import { StyleSheet } from 'react-native';

//This const list makes it easy to change these styles in a single place
const BACKGROUND_COLOUR = '#F5F5F5'; //White Smoke
const LIGHT_COLOUR = '#fff'; //White
const DARK_COLOUR = '#000000'; //Black
const ERROR_COLOUR = '#FF0000'; //Red
const BUTTON_COLOUR = '#3561ff'; //Vivid Blue
const HEADER_COLOUR = '#33ccff'; //Summer Sky
const FONT = 'Arial';
const FONT_SIZE = 20;
const FONT_SIZE_ERR = 15;

export default StyleSheet.create({
  //Button.js
  ButtonTextStyle: {
    flex: 1,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    color: LIGHT_COLOUR,
    fontFamily: FONT,
    fontSize: FONT_SIZE,
    fontWeight: '400',
    height: 40,
    paddingTop: 7,
    paddingBottom: 7,
  },
  //Button.js
  buttonStyle: {
    flex: 1,
    elevation: 2,
    flexDirection: 'row',
    backgroundColor: BUTTON_COLOUR,
    borderRadius: 5
  },
  //Card.js
  cardStyle: {
    backgroundColor: BACKGROUND_COLOUR,
    elevation: 1,
    flex: 1
  },
  //CardSection.js
  cardsectionStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: LIGHT_COLOUR,
    height: 40,
    position: 'relative',
    marginRight: 35,
    marginLeft: 35,
    marginTop: 15,
    marginBottom: 10,
    borderRadius: 5
  },
  //Header.js
  headerUserDetailsText: {
    fontFamily: FONT,
    fontSize: FONT_SIZE,
    textAlign: 'center',
    color: LIGHT_COLOUR,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 30,
    padding: 2,
    backgroundColor: HEADER_COLOUR,
    fontWeight: '400',
  },
  //Header.js
  headerSectionStyle: {
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: HEADER_COLOUR,
    height: 80,
    position: 'relative',
    paddingTop: 20
  },
  //Input.js
  inputStyle: {
    fontFamily: FONT,
    fontSize: FONT_SIZE,
    paddingLeft: 10,
    flex: 1,
    color: DARK_COLOUR
  },
  //Input.js
  inputContainerStyle: {
    flex: 1
  },
  //Spinner.js
  spinnerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  //Login.js & Register.js
  errorText: {
    fontFamily: FONT,
    fontSize: FONT_SIZE_ERR,
    alignSelf: 'center',
    color: ERROR_COLOUR,
  },
  //Login.js & Register.js
  errorView: {
    backgroundColor: BACKGROUND_COLOUR,
  },
  //Login.js & Register.js
  creditText: {
    color: HEADER_COLOUR,
    textAlign: 'center',
    fontStyle: 'italic'
  },
  //Daily.js
  listStyle: {
    textAlign: 'center',
    flex: 10,
    flexWrap: 'wrap',
    fontFamily: FONT,
    fontSize: FONT_SIZE,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    color: DARK_COLOUR,
    padding: 12
  },
  //Daily.js
  listHeaderStyle: {
    fontFamily: FONT,
    fontSize: 20,
    textAlign: 'center',
    color: DARK_COLOUR,
    backgroundColor: LIGHT_COLOUR,
    flexDirection: 'row',
    height: 70,
    padding: 12,
  },
});
