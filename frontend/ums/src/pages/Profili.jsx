import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { tokens } from "../theme";
import { useTheme, Typography, TextField } from "@mui/material";
import Prophilepic from "../../src/assets/foto.png";
import { CardMedia, Avatar } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import ProfilePicture from "../components/ProfilePicture/ProfilePicture";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { getToken } from "../GetToken";
// import { useHistory } from "react-router-dom";

function Profili({ changeLoggedInState, user }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const token = getToken();

  function logOut() {
    const response = fetch("http://localhost:8080/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    document.cookie = "Token=";
    changeLoggedInState();
  }

  function formatDate(date) {
    const dataLindjes = new Date(date);

    const year = dataLindjes.getFullYear();
    const month = String(dataLindjes.getMonth() + 1).padStart(2, "0");
    const day = String(dataLindjes.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user.firstName !== "Loading") {
      setLoading(false);
    }
  }),
    [user];

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) {
    return <h1>LOADING...</h1>;
  } else {
    return (
      <>
        <div className="m-5" style={{ height: "88svh" }}>
          <div className="w-full h-full flex justify-center align-center">
            <div className="w-11/12 h-full  p-2 ">
              <div className="flex h-full justify-around items-center align-center flex-col">
                <div className="w-full h-full  flex flex-row justify-between items-center align-center ">
                  <Card
                    sx={{ background: colors.primary[400] }}
                    className="w-4/12 h-3/4"
                  >
                    <div className="flex flex-col justify-between items-center h-full ">
                      <div className="h-1/2 mt-5 w-full  flex flex-col items-center">
                        <CardMedia
                          component="picture"
                          style={{
                            maxHeight: "10rem",
                            maxWidth: "10rem",
                            borderRadius: "50%",
                          }}
                        >
                          {/* <img src={Prophilepic} className="rounded-full"></img> */}
                          <Box sx={{display:"flex", justifyContent:"space-around", flexDirection:"column", alignItems:"center", gap:"25px"}}>
                            <Avatar
                              alt="profile-user"
                              src={`http://localhost:8080/profile-pictures/${user.profile}`}
                              sx={{
                                width: 150,
                                height: 150,
                                ":hover": { cursor: "pointer" },
                              }}
                            />

                            <ProfilePicture
                              open={open}
                              handleOpen={handleOpen}
                              handleClose={handleClose}
                            />
                          </Box>
                        </CardMedia>
                      </div>
                      <div className="h-1/2 flex flex-col gap-4"></div>
                    </div>
                  </Card>
                  <Card
                    sx={{ background: colors.primary[400] }}
                    className="w-7/12 h-3/4 flex justify-center items-center "
                  >
                    <div className="text-xl w-full m-4">
                      <table class="border-collapse border border-slate-500 ... w-full">
                        <tbody>
                          <tr>
                            <td class="w-1/2 p-4 border border-slate-700 ... ">
                              First Name:
                            </td>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              {user.firstName}
                            </td>
                          </tr>
                          <tr>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              Last Name:
                            </td>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              {user.lastName}
                            </td>
                          </tr>
                          <tr>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              ID:
                            </td>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              {user.id}
                            </td>
                          </tr>
                          <tr>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              Role:
                            </td>
                            <td class="w-1/2 p-4 border border-slate-700 ...">
                              {user.role}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card>
                </div>
                <div className="w-full h-full flex items-start align-center justify-start ">
                  <Card
                    sx={{ background: colors.primary[400] }}
                    className="w-full h-full"
                  >
                    <div>
                      <div className="m-4">
                        <table class="border-collapse border border-slate-500 ... w-full ">
                          <tbody>
                            <tr>
                              <td class="w-1/2 p-4 border border-slate-700 ... ">
                                Gender :{" "}
                                <span className="ml-6">{user.gjinia}</span>
                              </td>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                Date of Birth:{" "}
                                <span className="ml-6">
                                  {formatDate(user.dateLindja)}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                Email:{" "}
                                <span className="ml-6">{user.email}</span>
                              </td>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                Phone:
                                <span className="ml-6">{user.nrTelefonit}</span>
                              </td>
                            </tr>
                            <tr>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                Country:
                                <span className="ml-6">{user.shteti}</span>
                              </td>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                City:<span className="ml-6">{user.qyteti}</span>
                              </td>
                            </tr>
                            <tr>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                ZIP:<span className="ml-6">{user.zipcode}</span>
                              </td>
                              <td class="w-1/2 p-4 border border-slate-700 ...">
                                Address:
                                <span className="ml-6">{user.rruga}</span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="flex justify-evenly  content-center pt-5">
                        <button
                          type="button"
                          class="  w-44 same-size-button text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-5"
                        >
                          Change Password
                        </button>
                        <button
                          type="button"
                          class=" w-44 same-size-button text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-5 "
                          onClick={logOut}
                        >
                          Log out
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
                {console.log(user)}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profili;
