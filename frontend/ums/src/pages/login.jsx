import React, { useState, useEffect } from 'react'

import { Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import FooterSmes from '../components/footer.jsx';
import Swal from 'sweetalert2';
// import { useHistory } from 'react-router-dom';

//auth/signin



function Login({changeLoggedInState}) {
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
    // useEffect(() => {
    //     console.log(signupData);
    //  }, [signupData]);
    const handleSubmit = (e) => {
        e.preventDefault();
        postData(signupData);

    }
    const postData = async (data) => {
        // const postdata = axios.post('http://localhost:8080/auth/signin', data);
        // console.log('SHKOJ DATA');
        // console.log(postData);
        const response = await fetch('http://localhost:8080/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
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
        })
        const user = await userDetails.json();


            document.cookie = `Token=${encodeURIComponent(token)}`;
            console.log(token);
            // console.log(document.cookie);
            changeLoggedInState();
            // window.location.href = "";
    }

    return (
        <>
            <div className='h-auto lg:h-screen  overflow-scroll flex flex-col justify-end items-center'>
                <div className='w-screen h-screen flex justify-center items-center'>
                    <form onSubmit={handleSubmit} className="flex grow max-w-md flex-col gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput name='email' id="email1" type="email" placeholder="name@flowbite.com" value={signupData.email} onChange={handleChange} required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput name='password' id="password1" type="password" value={signupData.password} onChange={handleChange} required />
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">Remember me</Label>
                        </div>
                        <Button type="submit">Submit</Button>
                        <Link to="/">
                            <Button as="div" outline gradientDuoTone="cyanToBlue">Sign up</Button>
                        </Link>
                    </form>

                </div>
                <div className='w-full'>
                    <FooterSmes />
                </div>
            </div>
        </>
    )
}

export default Login