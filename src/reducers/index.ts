import { combineReducers } from 'redux';
import userReducer from './userReducer';
import userListReducer from './userListReducer';

const rootReducer = combineReducers({
  user: userReducer,
  userList: userListReducer,
});

export default rootReducer;