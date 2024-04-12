import React, { useState } from 'react';

import { Button, Card, Label, TextInput, Radio, Alert, Datepicker } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Swal from 'sweetalert2'


const About = () => {

  const currentDate = new Date();
  currentDate.setFullYear(currentDate.getFullYear() - 17);
  currentDate.setMonth(0); // Set month to January (0-indexed)
  currentDate.setDate(1);

  const [formData, setFormData] = useState({
    adresa: '',
    birthday: currentDate,
    city: '',
    email: '',
    name: '',
    surname: '',
    gender: 'male',
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
      <div className='h-screen flex items-center justify-center'>
        <Card>
          <form className="formDiv flex max-w-md flex-col gap-4 grid grid-cols-2" onSubmit={handleSubmit}>
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
              {/* <TextInput
            type="text"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          /> */}

            </label>
            <label>
              <Label htmlFor='email1' value='City'></Label>

              <TextInput
                type="text"
                name="city"
                value={formData.city}
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your password" />
              </div>
              <TextInput id="password1" type="password" name='password' value={formData.password} onChange={handleChange} required />
            </div>
            <Button className="content-center" type="submit">Log in!</Button>
            <Button className="content-center" type="submit">Register new account</Button>

          </form>
        </Card>
      </div>
    </>
  );
};

export default About;
