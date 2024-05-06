import React from 'react'
import Card from '@mui/material/Card';
import { tokens } from '../theme';
import { useTheme, Typography } from '@mui/material'
import Prophilepic from '../../src/assets/foto.jpeg';
import { CardMedia } from '@mui/material';
import TextField from "@mui/material/TextField";

function Profili() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
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
                                        Abdusamed Beqiri
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
                                    defaultValue="beqiriabdusamed@gmail.com"
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Numri Telefonit"
                                    variant="filled"
                                    defaultValue="0455192003"
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                                <TextField
                                    label="Adressa"
                                    variant="filled"
                                    defaultValue="Filan Fisteku, 23"
                                    inputProps={{ readOnly: true }}
                                    sx={{ input: { cursor: 'pointer' } }}
                                />
                            </div>
                        </div>



                    </Card>
                    <Card style={{ height: '40rem', width: '25rem' }} sx={{ background: colors.primary[400] }}>
                        <div className='mt-10 w-full h-full flex flex-col items-center gap-5' >
                            <TextField
                                label="Id"
                                variant="outlined"
                                defaultValue="222367766"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}

                            />
                            <TextField
                                label="Leternjoftimi"
                                variant="outlined"
                                defaultValue="117283998"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}
                            />
                            <TextField
                                label="Gjinia"
                                variant="outlined"
                                defaultValue="M"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}
                            />
                            <TextField
                                label="Emri"
                                variant="outlined"
                                defaultValue="Abdusamed"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}
                            />
                            <TextField
                                label="Emri Prindit"
                                variant="outlined"
                                defaultValue="Ibrahim"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}
                            />
                            <TextField
                                label="Mbiemri"
                                variant="outlined"
                                defaultValue="Beqiri"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}
                            />
                            <TextField
                                label="Vendlindja"
                                variant="outlined"
                                defaultValue="Ferizaj"
                                inputProps={{ readOnly: true }}
                                sx={{ input: { cursor: 'pointer' } }}
                            />
                            <TextField
                                label="Date Lindja"
                                variant="outlined"
                                defaultValue="10/12/2003"
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

export default Profili