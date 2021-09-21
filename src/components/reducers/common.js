import { LOGIN_RESULT_SUCCESS, LOGIN_RESULT_FAILED, SET_LOADING,
REGISTER_RESULT_FAILED, REGISTER_RESULT_SUCCESS, SEARCH_USER_FAILED } from '../actions/common';

export default function commonReducer( state = {}, action) {
    //console.log(action.type, action);
    switch (action.type) {
        case SET_LOADING:
            return Object.assign({}, state, { isLoading: action.isLoading });

        case LOGIN_RESULT_SUCCESS:
        case REGISTER_RESULT_SUCCESS:
            return Object.assign({}, state, {
                token: action.json.data.id_token,
                user: {},
                transactions: [],
                lastError: '',
            });

        case LOGIN_RESULT_FAILED:
        case REGISTER_RESULT_FAILED:
        case SEARCH_USER_FAILED:
            return Object.assign({}, state, {
                lastError: action.response.response.status + " - " + action.response.response.data
            });

        default:
            return state;
    }
}

export const commonActions = [LOGIN_RESULT_SUCCESS, LOGIN_RESULT_FAILED, SET_LOADING,
    REGISTER_RESULT_FAILED, REGISTER_RESULT_SUCCESS, SEARCH_USER_FAILED];
