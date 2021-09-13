import React from 'react';
import UserInfo from "./user";
import Transactions from './transactions';
import CreateTransaction from './newTransaction';
import AppProps from './types';

const Main = (props: AppProps) => {
  const [template, setTemplate] = React.useState({name: "", amount: 0});
  const applyTemplate = (name: string, amountDirty: number) => { setTemplate({name, amount: Math.abs(amountDirty)}) }

  return (
    <div>
      <UserInfo
        name={props.user.name ? props.user.name : "Unknown user"}
        balance={props.user.balance ? props.user.balance.toFixed(2) : 0} remove={props.remove}/>

      <div className="form-group d-flex justify-content-center align-items-center flex-column">
          { props.isLoading ? <span className="spinner-border"></span> : "" }
          { props.lastError ? <span className="alert-warning">{props.lastError}</span> : "" }
      </div>
      <CreateTransaction {...props} recipient={template.name} amount={template.amount.toString()} />
      <Transactions transactions={props.transactions} applyTemplate={applyTemplate}/>
    </div>
  )
}

export default Main;
