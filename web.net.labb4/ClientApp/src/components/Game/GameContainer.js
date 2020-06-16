import React from 'react'
import Game from '../Game/Game'
import * as Api from '../Actions/Api'

export class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestionIndex: 0,
            userScore: 0,
            selectedChoice: null,
            renderState: 'loading'
        };
    }

    componentDidMount() {
        this.populateQuestionsData();
        if (this.props.questions) {
            const { questions, currentQuestionIndex, renderState } = this.props;
            this.setState({ questions, currentQuestionIndex, renderState });
        }
    }
    setRenderState = (newState) => {
        this.setState({ renderState: newState });
    }
    onContinue = (e) => {
        const { questions, currentQuestionIndex, selectedChoice } = this.state;
        const answer = questions[currentQuestionIndex].answer;
        const score = selectedChoice === answer ? 1 : 0;

        this.setState({ userScore: this.state.userScore += score });
        this.nextQuestion();
    }
    nextQuestion = () => {
        if (this.state.currentQuestionIndex + 1 < this.state.questions.length) {
            this.setState(
                {
                    currentQuestionIndex: this.state.currentQuestionIndex += 1,
                    renderState: 'question',
                    selectedChoice: null
                });
        } else {
            this.setState({ renderState: 'finish' });
        }
    }
    onChoiceSelected = e => {
        this.setState(
            {
                renderState: 'continue',
                selectedChoice: e.target.value
            });
    }
    onFinish = async () => {
        let id = JSON.parse(localStorage["userData"]).id;
        await Api.put('score', id, this.state.userScore).then((res) => {
            if (!res.ok) {
                res.json().then(err => {
                    console.log(err);
                });
            } else {
                console.log("score set")
            }
        }).catch(err => alert(err));
    }
    onResetGame = () => {
        this.setState(
            {
                renderState: 'question',
                selectedChoice: 0,
                currentQuestionIndex: 0,
                userScore: 0
            });
    }

    render() {
        let content = this.state.renderState === 'loading' ?
            <h2><em>Loading...</em></h2>
            : this.state.questions.length > 0 ?
                <Game
                    questions={this.state.questions}
                    currentIndex={this.state.currentQuestionIndex}
                    onContinue={this.onContinue}
                    onFinish={this.onFinish}
                    onChoiceSelected={this.onChoiceSelected}
                    selectedChoice={this.state.selectedChoice}
                    renderState={this.state.renderState}
                    userScore={this.state.userScore}
                    onResetGame={this.onResetGame}/>
                : <div><h2>No questions in database...</h2></div>
        return <div className="container text-center">{content}</div>;
    }

    async populateQuestionsData() {
        const response = await Api.get('question');
        const data = await response.json();
        this.setState({
            questions: data,
            renderState: 'question',
            currentQuestionIndex: 0
        }
        );
    }
}