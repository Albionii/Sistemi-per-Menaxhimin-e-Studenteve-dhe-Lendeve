import { React } from 'react'
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from '../theme';
import { useTheme } from '@mui/material'

function dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    console.log(colors.primary[400]);
    return (
        <>
            <div className='pl-10 pt-10'>
                <div className='flex flex-row gap-4'>

                    <Link to="../Fakulteti">
                        <Card className="w-72 h-48" sx={{background: colors.primary[400]}}>
                            <div className='p-2'>
                                <h5 className="text-2xl font-bold tracking-tight" sx={{colors: colors.gray[700]}}>
                                    Fakulteti
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    veq testim
                                </p>
                            </div>
                        </Card>
                    </Link>
                    <Link to="../Departamenti">
                        <Card className="w-72 h-48" sx={{background: colors.primary[400]}}>
                            <div className='p-2'>
                                <h5 className="text-2xl font-bold tracking-tight " sx={{colors: colors.gray[700]}}>
                                    Departamenti
                                </h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">
                                    veq testim
                                </p>
                            </div>
                        </Card>
                    </Link>
                </div>
            </div>
        </>
    );

}

export default dashboard
