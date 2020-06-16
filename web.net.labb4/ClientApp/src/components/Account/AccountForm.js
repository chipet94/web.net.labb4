import React, { Component } from "react";
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import authAction from '../Actions/handlers/Account';


export class AccountForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            signUp: false,
            email: '',
            password: '',
            isChecked: false,
            errors: {
                Email: [],
                Password: []
            }
        }
        this.state = { ...this.initialState }
        this.loginHeader = React.createRef();
        this.registerHeader = React.createRef();
    }
    componentDidMount() {
        if (this.props) {
            const { signUp, email, password } = this.props;
            this.setState({ signUp, email, password });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }
    onCheck = e => {
        this.setState({ [e.target.name]: e.target.checked });
    }
    checkErrors = arr => {
        return arr === '' ? () => (
            <ul>{arr.map((err, id) => (
                <li key={id} className="alert-danger container" >{err}</li>))}</ul>) : '';
    }
    onSwitch = e => {
        const signup = e.target.value === 'register' ? true : false;
        this.setState({ signUp: signup });
    }

    onSubmit = e => {
        e.preventDefault();
        const { password, email, isChecked, signUp, errors } = this.state;

        let request = {
            Email: email,
            Password: password,
            Checked: isChecked
        }
        let type = signUp ? 'register' : 'login';
        authAction(type,
            this.props.onSuccess,
            request);
    }

    activeClass = (e) => {
        console.log(e)
        return (e === this.state.signUp ? 'col-6 d-inline d-block  rounded-top border-0' : 'col-6 d-inline d-block  rounded-top border-0')
    }
    render() {
        const { signUp, errors, isChecked } = this.state;

        return (
            <Form className="container" onSubmit={this.onSubmit} >
                <div className="row text-center">
                    <input type="button" className={(this.activeClass(false))} onClick={this.onSwitch} value="login" />
                    <input type="button" className={(this.activeClass(true))} onClick={this.onSwitch} value="register" />
                </div>
                <h3 className="text-center">{signUp ? "Register" : "Login"}</h3>
                <div>{this.checkErrors(errors)}</div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" name="email" onChange={this.onChange} placeholder="Enter email" />
                    <ErrorContainer errors={errors.Email} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" onChange={this.onChange} placeholder="Enter password" />
                    <ErrorContainer errors={errors.Password} />
                </div>
                {signUp ?
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name="isChecked" value={isChecked} onChange={this.onCheck} id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Is Admin?</label>
                        </div>
                    </div>
                    :
                    <div className="form-group">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" name="isChecked" value={isChecked} onChange={this.onCheck}
                                id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">remember?</label>
                        </div>
                    </div>
                }

                <Button type="submit" className="btn btn-primary btn-block">{signUp ? "Register" : "Login"}</Button>
            </Form>
        );
    }
}
export default AccountForm
const ErrorContainer = ({ errors }) => {
    errors = errors || [];
    return (
        <span>
            <ul>{errors.map((err, id) => (
                <li key={id} className="alert-danger container" >{err}</li>))}
            </ul>
        </span>);
}