import axios from "axios";
import { setLoading } from "./common";

export const USER_INFO_FAILED = 'USER_INFO_FAILED';
export const USER_INFO_SUCCESS = 'USER_INFO_SUCCESS';
export const USER_TRANSACTIONS_SUCCESS = 'USER_TRANSACTIONS_SUCCESS';
export const USER_TRANSACTIONS_FAILED = 'USER_TRANSACTIONS_FAILED';
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
///////////////////////////////////////////
const AxiosInstance = axios.create({
    baseURL: 'http://193.124.114.46:3001/',
    timeout: 1000
});

export function userInfo(token) {
    return dispatch => {
      dispatch(setLoading(true));
      return AxiosInstance
        .get ('api/protected/user-info', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
          dispatch( userInfoSuccess (response));
          dispatch( setLoading (false));
          return response.data.user_info_token;
        })
        .catch(err => {
          dispatch( userInfoFailed (err));
          dispatch( setLoading (false));
        });
    }
}
export function getTransactions(token) {
    return dispatch => {
      dispatch(setLoading(true));
      return AxiosInstance
        .get ('api/protected/transactions', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then (response => {
          dispatch (userTransactionSuccess (response));
          dispatch (setLoading (false));
          return response.data.trans_token;
        })
        .catch (err => {
          dispatch (userTransactionFailed (err));
          dispatch (setLoading (false));
        });
    }
}  
export function sendPW (token, name, amount) {
    return dispatch => {
      dispatch(setLoading(true));
      return AxiosInstance
        .post ('api/protected/transactions',
        { name, amount },
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then (response => {
          dispatch (sendPwSuccess (response))
          dispatch (setLoading (false));
          return response.data.trans_token;
        })
        .catch (err => {
          dispatch (sendPwFailed (err))
          dispatch (setLoading (false));
        });
    }
}
