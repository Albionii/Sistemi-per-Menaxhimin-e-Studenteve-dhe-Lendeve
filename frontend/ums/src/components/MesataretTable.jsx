import React from 'react'
import useTranskriptaData from '../getMesatarjaSemesterEcts';
import { Box, useTheme, Typography } from '@mui/material';
import { tokens } from '../theme';

const MesataretTable = ({token}) => {
    const { mesatarja, ects, semester } = useTranskriptaData(token);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box>
                <Box
                  textAlign={"center"}
                  bgcolor={colors.primary[400]}
                  p={2}
                  pt={2}
                  borderRadius={"7px"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={2}
                    alignItems={"center"}
                    bgcolor={colors.primary[500]}
                    borderRadius={3}
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h5" pl={1} fontWeight={"bold"}>
                        Nota Mesatare:{" "}
                      </Typography>
                    </Box>
                    <Box
                      pt={2}
                      bgcolor={"#004F95"}
                      borderRadius={3}
                      pb={2}
                      textAlign={"center"}
                      width={"25%"}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        color={"white"}
                      >
                        {mesatarja == null ? 0 : mesatarja}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={2}
                    alignItems={"center"}
                    bgcolor={colors.primary[500]}
                    borderRadius={3}
                    mb={2}
                  >
                    <Box>
                      <Typography variant="h5" pl={1} fontWeight={"bold"}>
                        ECTS:{" "}
                      </Typography>
                    </Box>
                    <Box
                      pt={2}
                      bgcolor={"#004F95"}
                      borderRadius={3}
                      pb={2}
                      textAlign={"center"}
                      width={"25%"}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        color={"white"}
                      >
                        {ects}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    display={"flex"}
                    justifyContent={"space-between"}
                    p={2}
                    alignItems={"center"}
                    bgcolor={colors.primary[500]}
                    borderRadius={3}
                  >
                    <Box>
                      <Typography variant="h5" pl={1} fontWeight={"bold"}>
                        Semestri:{" "}
                      </Typography>
                    </Box>
                    <Box
                      pt={2}
                      bgcolor={"#004F95"}
                      borderRadius={3}
                      pb={2}
                      textAlign={"center"}
                      width={"25%"}
                    >
                      <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        color={"white"}
                      >
                        {semester}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
  )
}

export default MesataretTable