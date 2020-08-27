import React, {useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import LoginForm from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import Home from './components/Home/Home';
import PrivateRoute from '../src/components/utils/PrivateRoute';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);

    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route path="/" exact={true}>
                        <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                    </Route>
                    <Route path="/register">
                        <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                    </Route>
                    <Route path="/login">
                        <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                    </Route>
                    <PrivateRoute path="/home">
                        <Home/>
                    </PrivateRoute>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
