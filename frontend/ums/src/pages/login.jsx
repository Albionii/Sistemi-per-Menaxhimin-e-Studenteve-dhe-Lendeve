import React from 'react'

import { Link } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import FooterSmes from '../components/footer.jsx';


function login() {
    return (
        <>
            <div className='h-auto lg:h-screen  overflow-scroll flex flex-col justify-end items-center'>

                <div className='w-screen h-screen flex justify-center items-center'>
                    <form className="flex grow max-w-md flex-col gap-4 p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email1" value="Your email" />
                            </div>
                            <TextInput id="email1" type="email" placeholder="name@flowbite.com" required />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password1" value="Your password" />
                            </div>
                            <TextInput id="password1" type="password" required />
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

export default login