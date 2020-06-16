import React, { Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from './components/Home';
import Logout from './components/Account/Logout'
import { loggedIn } from './components/Actions/Api';
import Header from './components/Header';
import { QuestionForm } from './components/AddQuestion';
import { GameContainer } from './components/Game/GameContainer';
import ScoreBoard from './components/ScoreBoard';
import './custom.css'

function App() {
    const initialState = {
        id: null,
        username: '',
        isAdmin: false,
        token: ''
    }
    const [userState, setUserState] = useState(initialState);

    const onUserChange = () => {
        console.log("root", localStorage["userData"]);
        setUserState(prevState => ({ ...prevState, ...JSON.parse(localStorage["userData"]) }));
    }

    useEffect(() => {
        if (localStorage["userData"]) {
            const data = JSON.stringify(localStorage["userData"]);
            if (data.id)
                loggedIn().then(response => {
                    response
                        ? setUserState(prevState => ({ ...prevState, ...data }))
                        : localStorage.setItem("userData", ...JSON.stringify(initialState));
                });
        }
    }, [localStorage["userData"]]);

    return (
        <Router>
            <Header userState={userState} onSuccess={onUserChange} />
            <Switch className="container">
                <Route exact path='/'>
                    <Home userState={userState} onSuccess={onUserChange} />
                </Route>
                <Route path='/logout'>
                    {userState.id ?
                        <Logout onSuccess={onUserChange} userState={userState} />
                        : <Redirect to="/" />}
                </Route>
                <Route path='/addQuestion'>
                    {userState.isAdmin ? <QuestionForm /> : <Redirect to="/" />}
                </Route>
                <Route path='/play'>
                    {userState.id ? <GameContainer /> : <Redirect to="/" />}
                </Route>
                <Route path='/scoreboard'>
                    {userState.id ? <ScoreBoard /> : <Redirect to="/" />}
                </Route>
            </Switch>
        </Router>

    );
}
export default App