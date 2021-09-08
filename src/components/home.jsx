import React from 'react';
import UserInfo from "./user";
import Transactions from './transactions';
import CreateTransaction from './newTransaction';

const Main = (props) => {
  const [template, setTemplate] = React.useState({name: "", amount: ""});

  const applyTemplate = (name, amountDirty) => {
    let amount = Math.abs(amountDirty);
    setTemplate({name, amount});
  }
  

  return (
    <div>
      <UserInfo
        name={props.user.name ? props.user.name : "Unknown user"}
        balance={props.user.balance ? props.user.balance.toFixed(2) : "0"} remove={props.remove}/>
      <div className="form-group d-flex justify-content-center align-items-center flex-column">
          { props.isLoading ? <span className="spinner-border"></span> : "" }
          { props.lastError ? <span className="alert-warning">{props.lastError}</span> : "" }
      </div>
      <CreateTransaction {...props} recipient={template.name} amount={template.amount} />
      <Transactions transactions={props.transactions} applyTemplate={applyTemplate}/>
    </div>
  )
}

export default Main;
