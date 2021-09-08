import { LOGIN_RESULT_SUCCESS, LOGIN_RESULT_FAILED, SET_LOADING,
  REGISTER_RESULT_FAILED, REGISTER_RESULT_SUCCESS,
  USER_INFO_FAILED, USER_INFO_SUCCESS,
  USER_TRANSACTIONS_FAILED, USER_TRANSACTIONS_SUCCESS,
  SEARCH_USER_FAILED, SEND_PW_SUCCESS, SEND_PW_FAIL } from './actions';

function reducer( state = {}, action) {
  //console.log(action.type, action);
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, { isLoading: false });

    case LOGIN_RESULT_SUCCESS:
    case REGISTER_RESULT_SUCCESS:
      return Object.assign({}, state, {
        token: action.json.data.id_token,
        user: {},
        transactions: [],
        lastError: '',
      });
    case USER_INFO_SUCCESS:
      return Object.assign({}, state, {
        user: action.json.data.user_info_token,
      });
    case USER_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, {
        transactions: action.json.data.trans_token,
      });
    case SEND_PW_SUCCESS:
      const transactionsNew = state.transactions.concat(action.json.data.trans_token)
      return Object.assign({}, state, {
        transactions: transactionsNew,
        lastError: '',
      });

    case LOGIN_RESULT_FAILED:
    case REGISTER_RESULT_FAILED:
    case USER_INFO_FAILED:
    case USER_TRANSACTIONS_FAILED:
    case SEARCH_USER_FAILED:
    case SEND_PW_FAIL:
      return Object.assign({}, state, {
        lastError: action.response.response.status + " - " + action.response.response.data
      });

    default:
      return state;
  }
}

export default reducer;
