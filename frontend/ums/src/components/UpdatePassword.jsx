import React, { useState } from 'react'

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Fragment } from 'react';
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { Label, TextInput, Button } from "flowbite-react";
import { getToken } from '../GetToken';
import axios from 'axios';
import Swal from 'sweetalert2';





function UpdatePassword({ openPassword, handleClosePassword }) {
    const token = getToken();
    const theme = useTheme();

    const colors = tokens(theme.palette.mode);

    const [updatePassword, setUpdatePassword] = useState({
        oldPassword: "",
        newPassword: ""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatePassword({
            ...updatePassword,
            [name]: value
        });
    };
    const handleSubmit = () => {
        handleClosePassword();
        if (updatePassword.newPassword === updatePassword.oldPassword || updatePassword.newPassword.length < 8) {
            Swal.fire({
                title: "Something went wrong!",
                text: "Check your password!",
                icon: "error"
            });
        } else {
            axios
                .put(`http://localhost:8080/auth/updatePassword`, updatePassword, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            title: "Good job!",
                            text: "You have updated your password!",
                            icon: "success"
                        });
                    } else {
                        Swal.fire({
                            title: "Something went wrong!",
                            text: "Something went wrong while updating your password!",
                            icon: "error"
                        });
                    }
                })
                .catch((error) => {
                    Swal.fire({
                        title: "Something went wrong!",
                        text: "Something went wrong while updating your password!",
                        icon: "error"
                    });
                })
        }

    }

    return (
        <Fragment>
            <Dialog open={openPassword} onClose={handleClosePassword} fullWidth maxWidth="sm">
                <DialogContent sx={{ padding: '0px' }}>
                    <div className="relativew-full rounded-lg shadow p-5 flex items-center align-center justify-center" style={{ background: colors.primary[500] }}>
                        <div className='w-1/2'>
                            <label>
                                <Label htmlFor='email1' value='Old password' color={colors.gray[200]}></Label>

                                <TextInput
                                    type="text"
                                    name="oldPassword"
                                    autoComplete='off'
                                    placeholder='Old Password'
                                    value={updatePassword.oldPassword}
                                    onChange={handleChange}
                                    required
                                    style={{ background: colors.primary[500], color: colors.gray[200], borderColor: colors.primary[700] }}
                                />
                            </label>
                            <label>
                                <Label htmlFor='email1' value='New password' color={colors.gray[200]}></Label>

                                <TextInput
                                    type="text"
                                    name="newPassword"
                                    autoComplete='off'
                                    placeholder='New Password'
                                    value={updatePassword.newPassword}
                                    onChange={handleChange}
                                    required
                                    style={{ background: colors.primary[500], color: colors.gray[200], borderColor: colors.primary[700] }}
                                />
                            </label>
                            {/* <button onClick={handleClosePassword}>CLOSE</button> */}
                            {/* <button onClick={handleSubmit}>Submit</button> */}
                            <div className='flex flex-row gap-4'>
                                <Button outline as='div' style={{ cursor: 'pointer', background: colors.greenAccent[600] }} className="mt-3 items-center w-full" onClick={handleSubmit}>Submit</Button>
                                <Button outline as='div' style={{ cursor: 'pointer', background: colors.redAccent[600] }} className="mt-3 items-center w-full" onClick={handleClosePassword}>Close</Button>
                            </div>


                        </div>

                    </div>
                </DialogContent>
            </Dialog>
        </Fragment>
    )
}

export default UpdatePassword