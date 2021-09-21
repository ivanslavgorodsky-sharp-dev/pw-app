import {
    USER_INFO_FAILED, USER_INFO_SUCCESS,
    USER_TRANSACTIONS_FAILED, USER_TRANSACTIONS_SUCCESS,
    SEND_PW_SUCCESS, SEND_PW_FAIL } from '../actions/user';
  
export default function userReducer( state = {}, action) {
    //console.log(action.type, action);
    switch (action.type) {
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

        case USER_INFO_FAILED:
        case USER_TRANSACTIONS_FAILED:
        case SEND_PW_FAIL:
            return Object.assign({}, state, {
                lastError: action.response.response.status + " - " + action.response.response.data
            });

        default:
            return state;
    }
}

export const userActions = [USER_INFO_FAILED, USER_INFO_SUCCESS,
    USER_TRANSACTIONS_FAILED, USER_TRANSACTIONS_SUCCESS,
    SEND_PW_SUCCESS, SEND_PW_FAIL];
