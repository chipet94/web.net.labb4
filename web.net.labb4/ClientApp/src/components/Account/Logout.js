import React from "react";
import { withRouter } from "react-router-dom";
import authAction from "../Actions/handlers/Account";
const Logout = ({ onSuccess, userState, initialState }) => {
    const onLogout = () => {
        authAction("logout", onSuccess, null);
    };
    return (
        <div className="container">
            <p> Are you sure {userState.name}?
                    <button className="btn btn-danger" onClick={onLogout} >Logout</button> </p>
        </div>
    );
};
export default withRouter(Logout);