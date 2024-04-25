import React from 'react';

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Signup from './signup.jsx';
import Login from './login.jsx';


function authentication() {
    return (
        <Router>
            <Routes>
                <Route exact path='/'
                    element={<Signup />}>
                </Route>
                <Route exact path='/login'
                    element={<Login />}>
                </Route>
            </Routes>
        </Router>
    )
}

export default authentication