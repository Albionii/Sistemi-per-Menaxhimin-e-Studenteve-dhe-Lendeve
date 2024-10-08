import React from 'react'
import Home from '../pages/home'
import CrudCategories from '../pages/CrudCategories'
import { useNavigate } from 'react-router-dom';

function RedirectByRole({ token, role }) {
    // console.log(token);
    // console.log(role);
    const navigate = useNavigate();
    if (role === "ROLE_ADMIN") {
        navigate("/cruds", { replace: true })
        return (
            <>
                <CrudCategories roli={role} />
            </>
        )

    } else {
        navigate("/", { replace: true })
        return (
            <Home token={token} user={role}/>
        )
    }
}

export default RedirectByRole