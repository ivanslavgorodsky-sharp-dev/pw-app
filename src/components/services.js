import axios from "axios";
import {
  loginResultSuccess, loginResultFailed, setLoading,
  registerResultSuccess, registerResultFailed,
  userInfoFailed, userInfoSuccess, userTransactionSuccess, userTransactionFailed,
  searchUserFailed, sendPwSuccess, sendPwFailed } from './actions';

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
