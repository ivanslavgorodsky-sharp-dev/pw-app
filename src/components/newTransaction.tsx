import React, { useState, useEffect } from 'react';
import AppProps, { User } from './types';

interface TransactionProps extends AppProps {
    recipient: string,
    amount: string,
}

const NewTransaction = (props: TransactionProps) => {

    const [usersFound, setUserFound] = useState([]);
    const [values, setValues] = useState({recipient: "", amount: "", error: ""})

    useEffect(() => {
        setValues({recipient: props.recipient, amount: props.amount, error: ""});
    }, [props.recipient, props.amount]);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (evt.target.name === "recipient") {
            if (values.recipient !== evt.target.value) {
                if (evt.target.value.length) {
                    props.searchUser(props.token, evt.target.value)
                    .then( userArray => { if (userArray) setUserFound (userArray) });
                }
                setValues({...values, "recipient": evt.target.value, error: ""})
            }
        }
        if (evt.target.name === "amount") {
            setValues({...values, amount: evt.target.value, error: ""})
        }
    }

    const handleSubmit = (evt: React.FormEvent) => {

        if (props.user.balance < parseFloat (values.amount)) {
            setValues({...values, "error": "Not enough PW!"})
            return evt.preventDefault();
        }

        props.newTransaction (props.token, values.recipient, parseFloat (values.amount))
          .then( transaction => {
            //console.log("Transaction sent", transaction);
            setValues({recipient: "", amount: "", error: ""});
            props.userInfo (props.token)
                .then( user => {
                    if (user)
                        props.save ("user", JSON.stringify (user));
                });
          });

        evt.preventDefault()
    }

    return (
        <div className="form-group d-flex justify-content-center align-items-center flex-column p-3">
            { values.error ? <span className="alert-warning">{values.error}</span> : "" }
            <form className="content" onSubmit={handleSubmit}>
                <p className="text-center">Make Transaction</p>
                <input 
                    name="recipient" className="form-control" autoComplete="off" value={values.recipient}
                    list="datalistOptions" placeholder="Type name here" onChange={handleChange} required/>
                <datalist id="datalistOptions">
                    { usersFound.map( (item: User, i: number) => {
                        return <option key={i} value={item.name} />
                    })}
                </datalist>
                <input
                    name="amount" type="number" min="0.01" step="0.01" autoComplete="off" value={values.amount}
                    className="form-control" placeholder="Amount" required onChange={handleChange} />
                <button type="submit" className="btn btn-success w-100" disabled={props.isLoading ? true : false}>Send PW</button>
            </form>
        </div>
    )
}

export default NewTransaction;
