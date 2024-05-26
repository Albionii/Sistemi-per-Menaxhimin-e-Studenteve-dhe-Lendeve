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
    const [shfaq, setShfaq] = useState(false);

    const changeShfaq = () => {
        setShfaq(!shfaq);
    }

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
                <div className='m-5' style={{ height: '80svh' }}>
                    <div className='flex h-full justify-around items-center '>
                        <Card style={{ height: '30rem', width: '25rem', display: shfaq ? "none" : "block" }} sx={{ background: colors.primary[400], borderRadius: '8rem', }}>
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
                                    <Button color="info" variant="outlined" onClick={changeShfaq}>Shfaq me shume te dhena</Button>
                                    <Button color="error" variant="outlined" onClick={logOut}>LogOut</Button>

                                </div>
                            </div>



                        </Card>
                        <Card style={{ maxHeight: '45rem', maxWidth: '60rem', display: shfaq ? "block" : "none" }} sx={{ background: colors.primary[400], }}>

                            <div style={{ maxHeight: "80svh", maxWidth: "120svh", padding: "5rem" }} className="flex flex-row justify-center items-center  content-center gap-4">
                                <div className="flex flex-col w-full h-full items-center justify-center gap-4">
                                    <div>
                                        <InputLabel>Name</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.firstName}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Surname</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.lastName}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Gender</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.gjinia}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Student ID</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.id}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Email</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.email}
                                        />
                                    </div>
                                    <Button color="info" variant="outlined" onClick={changeShfaq}>Back</Button>
                                </div>

                                <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                                    <div>
                                        <InputLabel>Phone</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.nrTelefonit}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Country</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.shteti}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>City</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.qyteti}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>Street</InputLabel>

                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.rruga}
                                        />
                                    </div>
                                    <div>
                                        <InputLabel>ZIP Code</InputLabel>
                                        <TextField
                                            type="text"
                                            inputProps={{ readOnly: true }}
                                            value={user.zipcode}
                                        />
                                    </div>
                                    <Button color="error" variant="outlined" onClick={logOut}>LogOut</Button>
                                </div>
                            </div>
                        </Card>
                        {/* x</Card> */}
                        {console.log(user)}
                    </div>
                </div>
            </>
        )
    }

}

export default Profili