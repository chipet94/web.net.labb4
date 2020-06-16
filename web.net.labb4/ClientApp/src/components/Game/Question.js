import React from 'react'

const Question = ({ questionString, choices, onChoice, }) => {
    return (
        <div>
            <h2 className="">Q: {questionString}</h2>
            <div className="container row bg-light border-info">
                {choices.map((choice, index) => {
                    return <div key={index} className="col-6">
                        <button className="btn btn-block badge-pill bg-light border-info" onClick={onChoice} value={choice}>{choice}</button>
                    </div>
                })}
            </div>
        </div>
    );
}

export default Question