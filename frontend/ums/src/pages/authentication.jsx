import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";
import Signup from './signup.jsx';
import Login from './login.jsx';


function authentication() {
    return (
            <Routes>
                <Route exact path='/'
                    element={<Signup />}>
                </Route>
                <Route exact path='/login'
                    element={<Login />}>
                </Route>
            </Routes>
    )
}

export default authentication