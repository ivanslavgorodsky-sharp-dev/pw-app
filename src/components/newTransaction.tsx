import React, { useState, useEffect } from 'react';
import AppProps, { User } from './types';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface TransactionProps extends AppProps {
    recipient: string,
    amount: string,
}

const NewTransaction = (props: TransactionProps) => {
    const [usersFound, setUserFound] = useState([]);
    const formik = useFormik({
        initialValues: {
            recipient: '',
            amount: '',
        },
        validationSchema: Yup.object({
        recipient: Yup.string()
            .required('Recipient is required')
            .min(3, 'Recipient is too short - should be 3 chars minimum.')
            .matches(/[a-zA-Z]/, 'Recipient can only contain Latin letters.'),
        amount: Yup.number()
            .required('Amount is required')
            .min(0.01, 'Incorrect amount. min=0.01 PW')
            .max(props.user.balance, 'Not enough PW')
        }),
        onSubmit: values => {
            props.newTransaction (props.token, formik.values.recipient, parseFloat(formik.values.amount))
                .then( () => {
                formik.values.recipient = "";
                formik.values.amount = "0";
                props.userInfo (props.token)
                    .then( user => {
                        if (user)
                            props.save ("user", JSON.stringify (user));
                    });
                });
        },
      });

    useEffect(() => {
        formik.values.recipient = props.recipient;
        formik.values.amount = props.amount;
    // eslint-disable-next-line
    }, [props.recipient, props.amount]);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        if (formik.values.recipient !== evt.target.value) {
            if (evt.target.value.length) {
                props.searchUser(props.token, evt.target.value)
                .then( userArray => { if (userArray) setUserFound (userArray) });
            }
            formik.values.recipient = evt.target.value;
        }
    }

    return (
        <div className="form-group d-flex justify-content-center align-items-center flex-column p-3">
            <form className="content" onSubmit={formik.handleSubmit}>
                <p className="text-center">Make Transaction</p>
                <input 
                    name="recipient" className="form-control" autoComplete="off"
                    list="datalistOptions" placeholder="Type name here"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.recipient} />
                    {formik.touched.recipient && formik.errors.recipient ?
                    (<div className="alert-warning">{formik.errors.recipient}</div>) : null}
                    
                    <datalist id="datalistOptions">
                    { usersFound.map( (item: User, i: number) => {
                        return <option key={i} value={item.name} />
                    })}
                    </datalist>
                <input
                    name="amount" type="number" min="0.01" step="0.01" autoComplete="off"
                    className="form-control" placeholder="Amount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount} />
                    {formik.touched.amount && formik.errors.amount ?
                    (<div className="alert-warning">{formik.errors.amount}</div>) : null}

                <button type="submit" className="btn btn-success w-100" disabled={props.isLoading ? true : false}>Send PW</button>
            </form>
        </div>
    )
}

export default NewTransaction;
