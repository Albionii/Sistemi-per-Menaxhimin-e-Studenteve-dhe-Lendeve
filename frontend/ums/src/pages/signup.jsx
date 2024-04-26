import React, { useState } from 'react';

import { Button, Card, Label, TextInput, Radio, Alert, Datepicker } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Swal from 'sweetalert2'
import FooterSmes from '../components/footer.jsx';
import { Link } from "react-router-dom";



const About = () => {

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.birthday.getFullYear);
    // formData.birthday;
    postData(formData);
  };

  const [nameColor, setNameColor] = useState(undefined);
  const changeColorName = () => {
    setNameColor("failure");
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


  const postData = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      console.log(response);
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
              <div className="formDiv flex max-w-md flex-col gap-4 grid grid-cols-2">
                <label>
                  <Label htmlFor='email1' value='name' color={nameColor}></Label>
                  <TextInput
                    type="text"
                    name="name"
                    autoComplete='off'
                    color={nameColor}
                    placeholder="Filan"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label htmlFor='email1' value='Surname'></Label>

                  <TextInput
                    type="text"
                    name="surname"
                    autoComplete='off'
                    placeholder='Fisteku'
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label htmlFor='email1' value='Address'></Label>

                  <TextInput
                    type="text"
                    name="adresa"
                    value={formData.adresa}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  < Label value='Birthday'></Label>
                  <Datepicker utcOffset={1} onSelectedDateChanged={(e) => { formData.birthday = (new Date(e.setTime(e.getTime() + 8640000))) }} maxDate={currentDate} required>

                  </Datepicker>


                </label>
                <label>
                  <Label htmlFor='email1' value='Nr Tel.'></Label>

                  <TextInput
                    type="text"
                    name="nrTelefonit"
                    placeholder='04xxxxxxx'
                    value={formData.nrTelefonit}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label htmlFor='male'> Chose your gender
                    <div className='flex gap-2 '>
                      <br />
                      <div className="flex items-center gap-2">
                        <Radio id="male" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} defaultChecked={true} />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Radio id="female" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </div>
                  </Label>
                </label>
                <label>
                  <Label htmlFor='email1' value='Email'></Label>
                  <TextInput id='email1' type='email' name='email' value={formData.email} onChange={handleChange} placeholder="name@flowbite.com" required shadow />
                </label>
                <label>
                  <div>
                    <Label htmlFor="password1" value="Your password" />
                    <TextInput id="password1" type="password" name='password' value={formData.password} onChange={handleChange} required />
                  </div>
                </label>
              </div>
              <div className='flex justify-center items-center w-full'>
                <Button className="mt-3 items-center w-full" type="submit">Register new account</Button>
              </div>
              <div className="formDiv flex max-w-md flex-col gap-4 grid grid-cols-2">
                <label>
                  <Label value='Shteti'></Label>
                  <TextInput
                    type="text"
                    name="name"
                    autoComplete='off'
                    placeholder="Kosova"
                    value={formData.shteti}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label value='Qyteti'></Label>
                  <TextInput
                    type="text"
                    name="name"
                    autoComplete='off'
                    placeholder="Ferizaj"
                    value={formData.qyteti}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label value='Adresa'></Label>
                  <TextInput
                    type="text"
                    name="name"
                    autoComplete='off'
                    placeholder="Filan Fisteku, 4"
                    value={formData.rruga}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  <Label value='Zipcode'></Label>
                  <TextInput
                    type="text"
                    name="name"
                    autoComplete='off'
                    placeholder="70000"
                    value={formData.zipcode}
                    onChange={handleChange}
                    required
                  />
                </label>

              </div>

            </form>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <Link to="/login"> <a className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a></Link>
            </p>
          </Card>
        </div>
        <div className='w-full'>
          <FooterSmes />
        </div>
      </div>


      {/* <div className='static bottom-0 w-full'>
      <FooterSmes></FooterSmes>
      </div> */}
    </>
  );
};

export default About;
