import commonReducer, { commonActions } from './reducers/common';
import userReducer, { userActions } from './reducers/user';

export default function rootReducer( state = {}, action) {
  if (commonActions.indexOf(action.type) !== -1) {
    return commonReducer(state, action);
  }
  if (userActions.indexOf(action.type) !== -1) {
    return userReducer(state, action);
  }
  return state;
}
