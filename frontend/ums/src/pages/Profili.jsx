import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import { tokens } from '../theme';
import { useTheme, Typography, TextField } from '@mui/material'
import Prophilepic from '../../src/assets/foto.png';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';



// import { useHistory } from "react-router-dom";

function Profili({ changeLoggedInState, user }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    function logOut() {
        const response = fetch('http://localhost:8080/auth/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        document.cookie = "Token=";
        changeLoggedInState();
    }

    function formatDate(date) {

        const dataLindjes = new Date(date);

        const year = dataLindjes.getFullYear();
        const month = String(dataLindjes.getMonth() + 1).padStart(2, '0');
        const day = String(dataLindjes.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    const [loading, setLoading] = useState(true);



    useEffect(() => {
        if (user.firstName !== "Loading") {
            setLoading(false);
        }


    }), [user];

    if (loading) {
        return (<h1>LOADING...</h1>)
    } else {






        return (
            <>
                <div className='m-5' style={{ height: '88svh' }}>
                    <div className='w-full h-full flex justify-center align-center justify-center'>
                        <div className='w-11/12 h-full  p-2 '>
                            <div className='flex h-full justify-around items-center align-center flex-col'>
                                <div className='w-full h-full  flex flex-row justify-between items-center align-center '>
                                    <Card sx={{ background: colors.primary[400] }} className='w-4/12 h-3/4'>
                                        <div className='flex flex-col justify-between items-center h-full '>
                                            <div className='h-1/2 mt-5 w-full  flex flex-col items-center ' >
                                                <CardMedia component="picture" style={{ maxHeight: '10rem', maxWidth: '10rem', borderRadius: '50%' }}>
                                                    <img src={Prophilepic} className='rounded-full'></img>
                                                </CardMedia>
                                                <div className='mt-3'>
                                                    <Typography variant="h3" color={colors.gray[100]}>
                                                        {/* {console.log(user)} */}
                                                        {user.firstName + " " + user.lastName}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className='h-1/2 flex flex-col gap-4'>

                                                <Typography variant="h4" color={colors.gray[100]}>
                                                    Viti Studimeve: 22/23
                                                </Typography>
                                                <Button color="error" variant="outlined" onClick={logOut}>LogOut</Button>

                                            </div>
                                        </div>
                                    </Card>
                                    <Card sx={{ background: colors.primary[400] }} className='w-7/12 h-3/4'>
                                        h1
                                    </Card>
                                </div>
                                <div className='w-full h-full flex items-start align-center justify-start '>
                                    <Card sx={{ background: colors.primary[400] }} className='w-full h-full'>

                                    </Card>
                                </div>

                                {/* x</Card> */}
                                {console.log(user)}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }

}

export default Profili