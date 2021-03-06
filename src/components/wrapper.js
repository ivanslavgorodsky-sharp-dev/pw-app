import { connect } from "react-redux";
import { login, registerUser, searchUser } from './actions/common';
import { userInfo, getTransactions, sendPW } from "./actions/user";
import App from "../App.tsx";

const mapStateToProps = (state) => {
  return {
    user: state.user,
    token: state.token,
    transactions: state.transactions,
    lastError: state.lastError,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (name, email, password) => dispatch (registerUser (name, email, password)),
    login: (user, password) => dispatch (login(user, password)),
    userInfo: (token) => dispatch (userInfo (token)),
    getTransactions: (token) => dispatch (getTransactions(token)),
    searchUser: (token, term) => dispatch (searchUser (token, term)),
    newTransaction: (token, name, amount) => dispatch( sendPW(token, name, amount)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
