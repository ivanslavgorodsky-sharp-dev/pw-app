import React from 'react';
import { useHistory } from "react-router-dom";

const User = ({name, balance, remove}) => {
    let history = useHistory();

    const handleClick = (evt) => {
        remove("token");
        remove("user");
        remove("transactions");
        history.replace("/login");
    }

    return (
        <div className="form-group m-3 d-flex justify-content-between align-items-center">
            <div>
                <div>Username: <b>{name}</b></div>
                <div>Balance: <b>{balance}</b></div>
            </div>
            <div>
                <button type="button" className="btn btn-secondary" onClick={handleClick}>Logout</button>
            </div>
        </div>
    );
}

export default User;
