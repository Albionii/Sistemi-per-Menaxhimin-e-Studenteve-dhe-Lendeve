import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";
import Signup from './signup.jsx';
import Login from './login.jsx';


function authentication({changeLoggedInState}) {
    return (
        <Routes>
            <Route exact path='/'
                element={<Signup changeLoggedInState={changeLoggedInState} />}>
                {/* element={<Signup />}> */}
            </Route>
            <Route exact path='/login'
                element={<Login changeLoggedInState={changeLoggedInState} />}>
                {/* element={<Login />}> */}
            </Route>
            <Route path="*" element={<Signup />} />

        </Routes>
    )
}

export default authentication