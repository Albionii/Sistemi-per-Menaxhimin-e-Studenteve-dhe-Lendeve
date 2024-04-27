import {React } from 'react'
import { Card } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from '../theme';
import { useTheme } from '@mui/material'

function dashboard() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <>
            <div className='pl-10 pt-10'>
                <div className='flex flex-row gap-4'>

                <Link to="../Fakulteti">
                    <Card className="w-72 h-48" sx={{background: colors.primary[500]}}>
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                             Fakulteti
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            veq testim
                        </p>
                    </Card>
                  </Link>
                  <Link to="../Departamenti">
                    <Card  className="w-72 h-48">
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Departamenti
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            veq testim
                        </p>
                    </Card>
                 </Link>
                </div>
            </div>
        </>
    );

}

export default dashboard
