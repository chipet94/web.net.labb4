import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import * as Api from './Actions/Api'
import questionAction from './Actions/handlers/Questions';

export class QuestionForm extends React.Component {
    initialState = {
        id: null,
        questionString: '',
        answer: '',
        choices: [],
        errors: {
            QuestionString: [],
            Answer: [],
            Choices: []
        },
        submitButton: {
            disabled: false
        },
        loading: false
    }

    state = { ...this.initialState }

    componentDidMount() {
        if (this.props.question) {
            const { id, questionString, answer, choices } = this.props.question;
            this.setState({ id, questionString, answer, choices });
        }
    }

    onAddChoice = e => {
        let choice = '';
        this.setState((prevState) => ({
            choices: [...prevState.choices, choice]
        }));
    }

    onRemoveChoice = e => {
        let choices = [...this.state.choices]
        choices.splice(e.target.dataset.id, 1);
        this.setState({ choices }, () => console.log(this.state.choices))
    }

    onEditChoice = e => {
        const id = e.target.dataset.id;

        const value = e.target.value === '*' ? this.state.answer : e.target.value;
        this.setState((prevState) => (
            prevState.choices[id] = value
        ));

    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    checkErrors = arr => {
        return arr === ''
            ? () =>
                (<ul>{arr.map((err, id) => (
                    <li key={id} className="alert-danger container" >{err}</li>))}
                </ul>)
            : '';
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ loading: true });
        let question = {
            questionString: this.state.questionString,
            answer: this.state.answer,
            choices: this.state.choices
        }
        if (this.props.question) {
            question.id = this.state.id;
        }
        this.subAsync(question);
    }

    async subAsync(question) {
        const type = this.props.question ? 'put' : 'post'
        await questionAction(type, question, this.onActionSuccess, this.onActionError)
            .catch(err => alert(err));
    }

    onActionSuccess = () => {
        this.setState({ ...this.initialState });
    }

    onActionError = (err) => {
        console.log(err);
        this.setState({ errors: { ...err.errors }, loading: false });
    }

    render() {
        const { questionString, answer, choices, errors } = this.state;
        return this.state.loading ? <div>Loading...</div> : <div>
            <Form onSubmit={this.handleSubmit}>
                <FormGroup className="form-row">
                    <Label className="col-2 col-form-label" htmlFor="questionString">Question:</Label>
                    <div className="col-10">
                        <Input
                            type="text"
                            name="questionString"
                            className="col-sm-10"
                            onChange={this.onChange}
                            value={questionString === '' ? '' : questionString}
                            required />
                        <ErrorContainer errors={this.state.errors.QuestionString} />
                    </div>
                </FormGroup>
                <FormGroup className="form-row">
                    <Label className="col-2 col-form-label" htmlFor="answer">Answer:</Label>
                    <div className="col-10">
                        <Input type="text"
                            name="answer"
                            onChange={this.onChange}
                            className="form-control"
                            value={answer === '' ? '' : answer}
                            required />
                        <ErrorContainer errors={this.state.errors.Answer} />
                    </div>

                </FormGroup>
                <FormGroup className="bg-light form-row">
                    <label className="col-1 col-form-label" htmlFor={choices}>Choices</label>
                    <div id="choices" className="container-fluid">
                        {choices.map((choice, index) => (
                            <Choice key={index}
                                index={index}
                                onRemove={this.onRemoveChoice}
                                onChange={this.onEditChoice}
                                value={choice === '' ? '' : choice}
                                containerClass="row show-remove-trigger"
                                colClass="col-9"
                                inputClass="form-control"
                                labelClass="col-1 col-form-label"
                                removeClass="col-1 hide-remove" />
                        ))}
                        <ErrorContainer errors={this.state.errors.Choices} />
                        {choices.length > 0
                            ? <small className="float-right">tip: type <strong>*</strong> to auto-fill answer...</small>
                            : ''}
                    </div>
                    {choices.length < 4
                        ? <div className="text-center mx-auto">
                            <input type="button"
                                onClick={this.onAddChoice}
                                className="btn btn-info"
                                value="Add" />
                        </div>
                        : ""}
                </FormGroup>
                <Button ref="submitBtn" disabled={this.state.submitButton.disabled}>{this.state.submitButton.disabled
                    ? 'loading...'
                    : 'Send'}</Button>
            </Form>
        </div>;
    }
}

export default QuestionForm;

const ErrorContainer = ({ errors }) => {
    errors = errors || [];
    return (
        <span>
            <ul>{errors.map((err, id) => (
                <li key={id} className="alert-danger container" >{err}</li>))}
            </ul>
        </span>);
}
const Choice =
    ({ value, index, onChange, onRemove, labelClass, inputClass, removeClass, containerClass, colClass }) => {
        return (
            <div className={containerClass}>
                <label className={labelClass}>{index + 1}.</label>
                <div className={colClass}>
                    <input type="text" data-id={index} onChange={onChange} className={inputClass} value={value} required />

                </div>
                <div className={removeClass}>
                    <span onClick={onRemove} className="close text-center remove-button">x</span>
                </div>
            </div>
        );
    }