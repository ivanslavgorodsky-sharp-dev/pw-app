import axios from "axios";

export const LOGIN_RESULT_SUCCESS = 'LOGIN_RESULT_SUCCESS';
export const LOGIN_RESULT_FAILED = 'LOGIN_RESULT_FAILED';
export const SET_LOADING = 'SET_LOADING';
export const REGISTER_RESULT_SUCCESS = 'REGISTER_RESULT_SUCCESS';
export const REGISTER_RESULT_FAILED = 'REGISTER_RESULT_FAILED';
export const SEARCH_USER_FAILED = 'SEARCH_USER_FAILED';

export function setLoading(bool) {
    return {
        type: SET_LOADING,
        isLoading: bool,
    }
}
export function loginResultSuccess(json) {
    return {
        type: LOGIN_RESULT_SUCCESS,
        json
    }
}
export function loginResultFailed(res) {
    return {
        type: LOGIN_RESULT_FAILED,
        response: res
    }
}
export function registerResultSuccess(json) {
    return {
        type: REGISTER_RESULT_SUCCESS,
        json
    }
}
export function registerResultFailed(res) {
    return {
        type: REGISTER_RESULT_FAILED,
        response: res
    }
}
export function searchUserFailed(res) {
    return {
        type: SEARCH_USER_FAILED,
        response: res
    }
}
//////////////////////////////////////////////////////
const AxiosInstance = axios.create({
    baseURL: 'http://193.124.114.46:3001/',
    timeout: 1000
});
  
export function login(email, password) {
    return dispatch => {
        dispatch(setLoading(true));
        return AxiosInstance
        .post ('sessions/create', { email, password })
        .then( response => {
            dispatch( loginResultSuccess (response));
            dispatch( setLoading (false));
            return response.data.id_token;
        })
        .catch(err => {
            dispatch( loginResultFailed (err));
            dispatch( setLoading (false));
        });
    }
}
export function registerUser(username, email, password) {
    return dispatch => {
        dispatch( setLoading (true));
        return AxiosInstance
        .post ('users', { username, email, password })
        .then(response => {
            dispatch( registerResultSuccess (response));
            dispatch( setLoading (false));
            return response.data.id_token;
        })
        .catch(err => {
            dispatch( registerResultFailed (err));
            dispatch( setLoading (false));
        });
    }
}
export function searchUser (token, term) {
    return dispatch => {
        dispatch(setLoading(true));
        return AxiosInstance
        .post ('api/protected/users/list',
        { filter: term },
        {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then (response => {
            dispatch (setLoading (false));
            return response.data;
        })
        .catch (err => {
            searchUserFailed (err);
            dispatch (setLoading (false));
        });
    }
}
