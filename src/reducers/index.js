//export and combine Redux reducers for use elsewhere in the App
import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import DataReducer from './DataReducer';

export default combineReducers({
  auth: AuthReducer,
  data: DataReducer
});
