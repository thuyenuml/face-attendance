import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../constants/apiContants';
import { withRouter } from "react-router-dom";
import bioeye from './bioeye.png';

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "username":state.email,
            "password":state.password,
        }
        // let bodyFormData = new FormData();
        // bodyFormData.set('email',state.email);
        // bodyFormData.set('password', state.password);
        // axios({
        //     method: 'post',
        //     url: 'http://localhost:8080/token/generate-token',
        //     data: bodyFormData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        //     .then(function (response) {
        //         //handle success
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });
        console.log(payload);
        axios.post(API_BASE_URL+'/token/generate-token', payload)
            .then(function (response) {
                console.log(response);
                if(response.status === 200){
                    // window.localStorage.setItem('token', response.data.result.token);
                    // let token = window.localStorage.getItem('token');
                    // console.log('token: ' + token);
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.result.token);
                    console.log('token: ', localStorage.getItem(ACCESS_TOKEN_NAME));
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.code === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToRegister = () => {
        props.history.push('/register');
        props.updateTitle('Register');
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Login</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
            {/*<div className="background">*/}
            {/*    <img src={bioeye}/>*/}
            {/*</div>*/}
        </div>
    )
}

export default withRouter(LoginForm);
