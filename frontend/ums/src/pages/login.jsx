import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import Swal from 'sweetalert2';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';

function Login({ changeLoggedInState }) {
    const navigate = useNavigate(); 


    const [signupData, setSignupData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupData({
            ...signupData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await postData(signupData);
        if (token) {
            changeLoggedInState();
            navigate('/'); 
        }
    }

    const postData = async (data) => {
        const response = await fetch('http://localhost:8080/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const jwt = await response.json();

        const token = jwt.jwt;
        const url = 'http://localhost:8080/api/user';
        const userDetails = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({})
        });
        const user = await userDetails.json();

        document.cookie = `Token=${encodeURIComponent(token)}`;
        document.cookie = `Role=${encodeURIComponent(jwt.role)}`;

        if (user.status === 500) {
            Swal.fire({
                icon: "error",
                title: "GABIM",
                text: "Email apo password Gabim!"
            });
        } else {
            return token;
        }
    }

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <>
            <div className='h-auto lg:h-screen  overflow-scroll flex flex-col justify-end items-center'>
                <div className='w-screen h-screen flex justify-center items-center'>
                    <form onSubmit={handleSubmit} className="flex grow max-w-md flex-col gap-4 p-5 border rounded-lg shadow" style={{background: colors.primary[400], borderColor: colors.primary[600]}}>
                        <div>
                            <div className="mb-2 block" >
                                <Label htmlFor="email1" value="Your email" color={colors.gray[200]}/>
                            </div>
                            <TextInput name='email' id="email1" type="email" placeholder="email@ubt-uni.net" value={signupData.email} onChange={handleChange} required style={{background: colors.primary[500], color: colors.gray[200], borderColor: colors.primary[700]}}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" color={colors.gray[200]}/>
                            </div>
                            <TextInput name='password' id="password1" type="password" placeholder="Password" value={signupData.password} onChange={handleChange} required style={{background: colors.primary[500], color: colors.gray[200], borderColor: colors.primary[700]}}/>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember" color={colors.gray[200]}>Remember me</Label>
                        </div>
                        <Button type="submit">Submit</Button>
                        <Link to="/signup">
                            <Button as="div" outline gradientDuoTone="cyanToBlue" style={{background: colors.primary[600]}}>Sign up</Button>
                        </Link>
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login;
