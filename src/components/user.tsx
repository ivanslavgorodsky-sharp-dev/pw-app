import React from 'react';
import { useHistory } from "react-router-dom";

type UserProps = {
    name: string,
    balance: number | string,
    remove (param: string): void, 
}

const User = (props: UserProps) => {
    let history = useHistory();

    const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        props.remove("token");
        props.remove("user");
        props.remove("transactions");
        history.replace("/login");
    }

    return (
        <div className="form-group m-3 d-flex justify-content-between align-items-center">
            <div>
                <div>Username: <b>{props.name}</b></div>
                <div>Balance: <b>{props.balance}</b></div>
            </div>
            <div>
                <button type="button" className="btn btn-secondary" onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}

export default User;
