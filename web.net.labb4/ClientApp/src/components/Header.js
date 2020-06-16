import React from "react";
import { Link, withRouter } from "react-router-dom";
import authAction from './Actions/handlers/Account';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
const Header = ({ userState, onSuccess }) => {
    const onLogout = () => {
        authAction('logout', onSuccess, null);
    }
    return (
        <div>
            <div className="container row">
                <div className="col d-inline">
                    <Link to="/" className="card-header border-info float-left col-3">Home</Link>
                    {userState.id ? <p className="card-header border-info float-right"><small>Signed in as: </small><span className="text-info">{userState.username}</span> <Link className="text-danger" to="/logout">Logout</Link></p>
                        :
                        <p className="card-header border-info float-right text-danger">Not signed in...</p>}
                </div>
            </div>
            {userState.id ?
                <div className="row">
                    {userState.isAdmin ?
                        <div className="col border-bottom">
                            <Link to="/addQuestion" className="btn btn-block">AddQuestion</Link>
                        </div> : ''}
                    <div className="col border-bottom">
                        <Link to="/play" className="btn btn-block">Play</Link>
                    </div>
                    <div className="col border-bottom">
                        <Link to="/scoreboard" className="btn btn-block">HiScore</Link>
                    </div>
                </div>
                :
                <div className="container">

                </div>
            }
        </div>
    );
}

export default withRouter(Header);