export const LOGIN_RESULT_SUCCESS = 'LOGIN_RESULT_SUCCESS';
export const LOGIN_RESULT_FAILED = 'LOGIN_RESULT_FAILED';
export const SET_LOADING = 'SET_LOADING';
export const REGISTER_RESULT_SUCCESS = 'REGISTER_RESULT_SUCCESS';
export const REGISTER_RESULT_FAILED = 'REGISTER_RESULT_FAILED';
export const USER_INFO_FAILED = 'USER_INFO_FAILED';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_TRANSACTIONS_SUCCESS = 'USER_TRANSACTIONS_SUCCESS';
export const USER_TRANSACTIONS_FAILED = 'USER_TRANSACTIONS_FAILED';
export const SEARCH_USER_FAILED = 'SEARCH_USER_FAILED';
export const SEND_PW_SUCCESS = 'SEND_PW_SUCCESS';
export const SEND_PW_FAIL = 'SEND_PW_FAIL';


export function userInfoSuccess(json) {
  return {
    type: USER_INFO_SUCCESS,
    json
  }
}
export function userInfoFailed (res) {
  return {
    type: USER_INFO_FAILED,
    response: res
  }
}
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
export function userTransactionSuccess(json) {
  return {
    type: USER_TRANSACTIONS_SUCCESS,
    json
  }
}
export function userTransactionFailed(res) {
  return {
    type: USER_TRANSACTIONS_FAILED,
    response: res
  }
}
export function searchUserFailed(res) {
  return {
    type: SEARCH_USER_FAILED,
    response: res
  }
}
export function sendPwSuccess (json) {
  return {
    type: SEND_PW_SUCCESS,
    json
  }
}
export function sendPwFailed (res) {
  return {
    type: SEND_PW_FAIL,
    response: res
  }
}
