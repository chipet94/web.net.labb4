import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Redirect } from 'react-router-dom'
import * as Api from './Actions/Api'

const ScoreBoard = ({ onSuccess, userState }) => {
    const [hiScores, setHiScores] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (!loaded) {
            fetchScoreBoard();
        }
    },
        [loaded]);
    const diyListClass = "col-4 border border-dark";
    const fetchScoreBoard = async () => {
        await Api.get('score').then((res) => {
            if (!res.ok) {
                res.json().then(err => {
                    console.log(err);
                });
            } else {
                res.json().then(val => {
                    setHiScores(val);
                });

                setLoaded(true);
            }
        }).catch(err => alert(err));
    }
    return (
        <div className="container">
            {!loaded
                ? <div>Loading...</div>
                : <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">HiScores</h5>
                        <p className="card-text">might have to refresh before results update. </p>
                        <div className="row bg-secondary text-white text-center">
                            <div className={diyListClass}>Username</div><div className={diyListClass}>Score</div><div className={diyListClass}>Date</div>
                        </div>
                        {hiScores.map((val) => (
                            <div key={val.user} className="row bg-light">
                                <div className={diyListClass}>
                                    <p>{val.user}</p>
                                </div>
                                <div className={diyListClass}>
                                    {val.score}
                                </div>
                                <div className={diyListClass}>
                                    {val.date}
                                </div>
                            </div>))}
                    </div>
                </div>
            }
        </div>);
}
export default withRouter(ScoreBoard);