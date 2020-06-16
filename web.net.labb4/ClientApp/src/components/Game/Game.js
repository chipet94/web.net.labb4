import React from 'react';
import Question from './Question';
import { Link } from 'react-router-dom'

const Game = ({ questions, userScore, renderState, currentIndex, selectedChoice, onChoiceSelected, onContinue,
    onFinish, onResetGame }) => {
    const currentQuestion = questions[currentIndex];
    const continueState = () => {
        let choice = currentQuestion.choices[selectedChoice];
        return (
            <div>
                {currentQuestion.answer === selectedChoice ?
                    <h1 className="text-success">"Correct!" </h1> :
                    <h1 className="text-danger">"Wrong!" </h1>}
                <h2 className="text-info">Q: {currentQuestion.questionString}</h2>
                <h2 className="text-success"> A: {currentQuestion.answer}</h2>
                <p className="text-info"> C: {selectedChoice}</p>
                <button className="btn btn-block btn-info" onClick={onContinue}>Continue</button>
            </div>
        );
    }
    const questionState = () => {
        return (
            <div>
                <Question
                    questionString={currentQuestion.questionString}
                    choices={currentQuestion.choices}
                    onChoice={onChoiceSelected} />
            </div>);
    }
    const finishState = () => {
        return (
            <div>
                <h1>Finished...</h1>
                <h2>Score: {userScore}</h2>
                <Link to="/scoreboard" className="btn border-info" onClick={onFinish} >Finish</Link>
                <button onClick={onResetGame} className="btn btn-danger">Reset</button>
            </div>);
    }
    return (
        <div>
            <small className="text-info float-right">Score: {userScore}</small>
            {renderState === 'finish' ? finishState() :
                renderState === 'continue' ? continueState() : questionState()}
        </div>
    );
}

export default Game