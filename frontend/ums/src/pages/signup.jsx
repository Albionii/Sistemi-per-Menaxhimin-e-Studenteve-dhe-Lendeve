import React, { useState } from 'react';

import { Button, Card, Label, TextInput, Radio, Alert, Datepicker } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Swal from 'sweetalert2'
import FooterSmes from '../components/footer.jsx';
import { Link } from "react-router-dom";
import { tokens } from '../theme.js';
import { useTheme } from '@mui/material';



const About = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 17);
  currentDate.setMonth(0); // Set month to January (0-indexed)
  currentDate.setDate(1);

  const [formData, setFormData] = useState({
    rruga: '',
    dateLindja: currentDate,
    qyteti: '',
    zipcode: '',
    shteti: '',
    nrTelefonit: '',
    email: '',
    firstName: '',
    lastName: '',
    gjinia: 'male',
    password: ''
  });

  // console.log(formData);
  const handleChange = (e) => {
    if (e.target.name === "shteti") {
      mbushQytetet();
    }
    // console.log(e.target);
    // console.log(e.target.name);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
    // console.log(formData);
  };

  const handleDateChange = (e) => {
    // console.log(e);
    const date = new Date(e);
    setFormData({
      ...formData,
      'dateLindja': date
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData(formData);
  };

  const [nameColor, setNameColor] = useState(undefined);
  const changeColorName = () => {
    setNameColor("failure");
  };

  const [isAdress, setIsAdress] = useState(true);
  const changeIsAdress = () => {
    setIsAdress(!isAdress);
  };

  const [parameterError, setParameterError] = useState("");
  const changeParameterError = (typeOf) => {
    setParameterError(typeOf)
  };

  const [displayError, setDisplayError] = useState(false);
  const changeDisplayType = () => {
    setDisplayError(true);
    setTimeout(() => {
      setDisplayError(false);
    }, 4000);

  };
  // mbushQytetet();

  const postData = async (data) => {
    try {
      //Pjesa e Validimit
      const passwordOrig = document.getElementById("password1").value;
      const passwordComp = document.getElementById("password2").value;
      const email = document.getElementById("email1").value;
      const shteti = document.getElementById("ShtetiDropdown").value;
      const qyteti = document.getElementById("QytetiDropdown").value;


      let isValid = true;

      if (passwordComp !== passwordOrig) {
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Konfirmo Passwordin!",
          timer: 1000
        })
      }
      if (!email.endsWith("@gmail.com")) {
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Konfirmo Email!",
          timer: 1000
        })
      }
      if(qyteti === "" || shteti === ""){
        isValid = false;
        Swal.fire({
          icon: "error",
          title: "Konfirmo Shtetin ose qytetin",
          timer: 1000
        })
      }


      if (isValid) {
        const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        const jwt = await response.json();
        // console.log(jwt);

        // console.log(resp);
        // console.log(response);
        if (response.status > 600) {
          changeDisplayType();
        }
        if (response.status == 601) {
          changeParameterError("Emri");
        }
        if (response.status == 602) {
          changeParameterError("Mbiemri");
        }
        if (response.status == 603) {
          changeParameterError("Data ");
        }
        if (response.status == 604) {
          changeParameterError("Email ");
        }
        if (response.status === 201) {
          Swal.fire({
            icon: "success",
            title: "U regjistrua!",
            showConfirmButton: false,
            timer: 3000
          }).then(() => {
            // window.location.href = "/Services";
          })
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };


  function mbushQytetet() {
    const shteti = document.getElementById("ShtetiDropdown").value;

    const qyteti = document.getElementById("QytetiDropdown");

    qyteti.innerHTML = "";

    if (shteti === "Kosova") {
      const qytetet = ["-","Ferizaj", "Prishtina", "Gjakova","Peja"];
      qytetet.forEach((city) => {
        var option = document.createElement("option");
        option.text = city;
        option.value = city;
        qyteti.add(option);
      })
    }
    if (shteti === "Maqedoni") {
      const qytetet = ["-","Tetova", "Gostivari", "Shkupi"];
      qytetet.forEach((city) => {
        var option = document.createElement("option");
        option.text = city;
        option.value = city;

        qyteti.add(option);
      })
    }

    if (shteti === "Shqiperi") {
      const qytetet = ["-","Durres", "Shkup", "Tiran"];
      qytetet.forEach((city) => {
        var option = document.createElement("option");
        option.text = city;
        option.value = city;
        qyteti.add(option);
      })
    }
    setFormData({
      ...formData,
      qyteti: qyteti.value,
    })

  }



  return (
    <>
      <div className='absolute bottom-0 left-0'>
        <Alert color="failure" icon={HiInformationCircle} className='w-11/12 m-5' style={{ display: displayError ? "block" : "none" }}>
          <span className="font-bold">Gabim!</span> {parameterError} I pa pranuar.
        </Alert>
      </div>
      <div className='h-auto lg:h-screen  overflow-scroll flex flex-col justify-end items-center'>
        <div className='w-full flex items-center justify-evenly h-full  flex-col-reverse lg:flex-row '>
          <Card className="max-w-sm mb-5 lg:mb-0">
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Mire se vini ne SEMS</h5>
            <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
              Mirë se vini në platformën tonë për shkëmbimin e notave dhe komunikimin efikas midis studentëve dhe profesorëve. Monitoroni përparimin, merrni feedback dhe menaxhoni notat në një mjedis të përshtatur për nevojat tuaja akademike. Bashkohuni me ne për një eksperiencë të përmirësuar të arsimit!
            </p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-x-4 sm:space-y-0">
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
              >
                <svg
                  className="mr-3 h-7 w-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="apple"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path
                    fill="currentColor"
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  />
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Download on the</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">Mac App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex w-full items-center justify-center rounded-lg bg-gray-800 px-4 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 sm:w-auto"
              >
                <svg
                  className="mr-3 h-7 w-7"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google-play"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                  />
                </svg>
                <div className="text-left">
                  <div className="mb-1 text-xs">Get in on</div>
                  <div className="-mt-1 font-sans text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </Card>
          <Card className='mb-4 lg:mb-0 mt-5 lg:mt-0 '>
            <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white text-center">Krijo nje account!</h5>

            <form onSubmit={handleSubmit}>
              <div className="formDiv flex max-w-md flex-col gap-4 grid grid-cols-2" style={{ display: isAdress ? '' : 'none' }}>
                <label>
                  <Label htmlFor='email1' value='name' color={nameColor}></Label>
                  <TextInput
                    type="text"
                    name="firstName"
                    autoComplete='off'
                    color={nameColor}
                    placeholder="Filan"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label htmlFor='email1' value='Surname'></Label>

                  <TextInput
                    type="text"
                    name="lastName"
                    autoComplete='off'
                    placeholder='Fisteku'
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </label>
                {/* <label>
                  <Label htmlFor='email1' value='Address'></Label>

                  <TextInput
                    type="text"
                    name="adresa"
                    value={formData.adresa}
                    onChange={handleChange}
                    required
                  />
                </label> */}
                <label>
                  <Label htmlFor='email1' value='Nr Tel.'></Label>

                  <TextInput
                    type="text"
                    name="nrTelefonit"
                    placeholder='04xxxxxxx'
                    value={formData.nrTelefonit.numri}
                    onChange={handleChange}
                    required
                  />
                </label>

                <label>
                  < Label value='Birthday'></Label>
                  <Datepicker name='dateLindja' id="date" onSelectedDateChanged={(e) => { handleDateChange(e.setTime(e.getTime() + 8640000)) }} maxDate={currentDate} required>

                  </Datepicker>


                </label>

                <label>
                  <Label htmlFor='email1' value='Email'></Label>
                  <TextInput id='email1' type='email' name='email' value={formData.email} onChange={handleChange} placeholder="name@flowbite.com" required shadow />
                </label>
                <label>
                  <Label htmlFor='male'> Chose your gender
                    <div className='flex gap-2 '>
                      <br />
                      <div className="flex items-center gap-2">
                        <Radio id="male" name="gjinia" value="male" checked={formData.gjinia === 'male'} onChange={handleChange} />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio id="female" name="gjinia" value="female" checked={formData.gjinia === 'female'} onChange={handleChange} />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </div>
                  </Label>
                </label>
                <label>
                  <div>
                    <Label htmlFor="password1" value="Your password" />
                    <TextInput id="password1" type="password" name='password' value={formData.password} onChange={handleChange} required />
                  </div>
                </label>
                <label>
                  <div>
                    <Label htmlFor="password1" value="Confirm Password" />
                    <TextInput id="password2" type="password" name='password2' required />
                  </div>
                </label>
              </div>
              <div className="formDiv flex max-w-md flex-col gap-4 grid grid-cols-2" style={{ display: isAdress ? 'none' : '' }}>

                <label className='mb-3'>
                  <Label value='Shteti'></Label>
                  <select style={{ color: 'white', background: '#374151', outline: 'solid', outlineWidth: '1px', outlineColor: '#4b5563' }} id="ShtetiDropdown" name="shteti" className='w-full h-full rounded px-2.5 ' value={formData.shteti} onChange={handleChange}>
                    <option value="">Zgjidhe Shtetin</option>
                    <option value="Kosova">Kosova</option>
                    <option value="Shqiperi">Shqiperi</option>
                    <option value="Maqedoni">Maqedoni</option>
                  </select>
                </label>
                <label className='mb-3'>
                  <Label value='Qyteti'></Label>
                  <select style={{ color: 'white', background: '#374151', outline: 'solid', outlineWidth: '1px', outlineColor: '#4b5563' }} id="QytetiDropdown" name="qyteti" className='w-full h-full rounded px-2.5' value={formData.qyteti} onChange={handleChange}>
                    <option value="">Zgjidhe Qytetin</option>
                  </select>

                </label>
                <label >
                  <Label value='Adresa'></Label>
                  <TextInput
                    type="text"
                    name="rruga"
                    id='Inputrruga'
                    autoComplete='off'
                    placeholder="Kosova"
                    value={formData.rruga}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label value='Zipcode'></Label>
                  <TextInput
                    type="text"
                    name="zipcode"
                    autoComplete='off'
                    placeholder="70000"
                    value={formData.zipcode}
                    onChange={handleChange}
                    required
                  />
                </label>

              </div>
              <div className='flex justify-center items-center w-full gap-4'>
                <Button outline gradientDuoTone="cyanToBlue" as='div' style={{ cursor: 'pointer' }} className="mt-3 items-center w-full" onClick={changeIsAdress}>{isAdress ? 'Next' : 'Previous'}</Button>

                <Button className="mt-3 items-center w-full" type="submit" style={{ display: isAdress ? 'none' : '' }}>Register new account</Button>
              </div>


            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <Link to="/login"> <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></Link>
            </p>
          </Card>
        </div>
        {/* <div className='w-full'>
          <FooterSmes />
        </div> */}
      </div>


      {/* <div className='static bottom-0 w-full'>
      <FooterSmes></FooterSmes>
      </div> */}
    </>
  );
};

export default About;
