import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import { tokens } from '../theme';
import { useTheme, Typography } from '@mui/material'
import Prophilepic from '../../src/assets/foto.png';
import { CardMedia } from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';


// import { useHistory } from "react-router-dom";

function Profili({ changeLoggedInState, user }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    function logOut() {
        document.cookie = `Token=`;
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
        if(user.firstName !== "Loading"){
            setLoading(false);
        }


    }),[user];

    if (loading) {
        return (<h1>LOADING...</h1>)
    } else {


        return (
            <>
                <div className='m-5' style={{ height: '80svh' }}>
                    <div className='flex h-full justify-around items-center'>
                        <Card style={{ height: '40rem', width: '25rem' }} sx={{ background: colors.primary[400] }}>
                            <div className='flex flex-col justify-between items-center h-full '>
                                <div className='h-2/5 mt-5 w-full  flex flex-col items-center' >
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
                                <div className='h-3/5 flex flex-col gap-4'>

                                    <Typography variant="h4" color={colors.gray[100]}>
                                        Viti Studimeve: 22/23
                                    </Typography>
                                    <TextField
                                        label="Email"
                                        variant="filled"
                                        defaultValue={user.email}
                                        inputProps={{ readOnly: true }}
                                        sx={{ input: { cursor: 'pointer' } }}
                                    />
                                    <TextField
                                        label="Numri Telefonit"
                                        variant="filled"
                                        defaultValue={user.nrTelefonit}
                                        inputProps={{ readOnly: true }}
                                        sx={{ input: { cursor: 'pointer' } }}
                                    />
                                    <TextField
                                        label="Adressa"
                                        variant="filled"
                                        defaultValue={user.rruga}
                                        inputProps={{ readOnly: true }}
                                        sx={{ input: { cursor: 'pointer' } }}
                                    />
                                    <Button color="error" variant="outlined" onClick={logOut}>LogOut</Button>

                                </div>
                            </div>



                        </Card>
                        <Card style={{ height: '40rem', width: '25rem' }} sx={{ background: colors.primary[400] }}>
                            <div className='mt-10 w-full h-full flex flex-col items-center gap-5' >
                                <TextField
                                    label="Id"
                                    variant="outlined"
                                    defaultValue={user.id}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}

                                />
                                <TextField
                                    label="Leternjoftimi"
                                    variant="outlined"
                                    defaultValue="Not In Entity"
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Gjinia"
                                    variant="outlined"
                                    defaultValue={user.gjinia}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Emri"
                                    variant="outlined"
                                    defaultValue={user.firstName}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Emri Prindit"
                                    variant="outlined"
                                    defaultValue={user.firstName}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Mbiemri"
                                    variant="outlined"
                                    defaultValue={user.lastName}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Vendlindja"
                                    variant="outlined"
                                    defaultValue={user.qyteti}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Date Lindja"
                                    variant="outlined"
                                    defaultValue={formatDate(user.dateLindja)}
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />

                            </div>




                        </Card>
                    </div>
                </div>
            </>
        )
    }

}

export default Profili