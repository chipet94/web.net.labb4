import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { Tabs, Tab } from 'reactstrap';
import { AccountForm } from './Account/AccountForm'

const Home = ({ userState, onSuccess }) => {
    console.log(userState)

    return (
        <div className="container">
            {!userState.id ?
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Halt!</h5>
                        <p className="card-text">You need to have an account to use this app...</p>
                        <div><AccountForm signUp={false} onSuccess={onSuccess} /></div>
                    </div>
                </div>
                :
                <div className="text-center">
                    <h1>Quiz</h1>
                    <Link to="/play" className="btn btn-primary">Start</Link>

                </div>}
        </div>
    );
}
export default withRouter(Home)