
import React, { useState ,  useEffect} from 'react';
import axios from 'axios';

import {MDBIcon} from "mdbreact";

import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  

  const handleRegister = async (e) => {
    e.preventDefault();

    
    // Validation rules
    const nameRegex = /^[a-z A-Z]+$/;
    const nicRegex = /^[a-zA-Z0-9]+$/;
    const phoneRegex = /^0\d{2}\d{7}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name validation
    if (!nameRegex.test(name)) {
      setError('Name must contain only alphabetic characters');
      return;
    }

    // NIC validation
    if (!nicRegex.test(nic)) {
      setError('NIC must contain only alphanumeric characters');
      return;
    }

    // Phone validation
    if (!phoneRegex.test(phone)) {
      setError('Phone number must be in the format 0xx-xxxxxxx');
      return;
    }

    // Email validation
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }

    // Password validation
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }

    if (!name || !nic || !phone || !email || !password || !cpassword) {
      setError('All fields are required to Fill');
      return;
    }

    if (password !== cpassword) {
      setError('Password and confirm password do not match');
      return;
    }

    const user = {
      name,
      nic,
      phone,
      email,
      password,
      cpassword,
    };

    try {
      setLoading(true);
      const result = (await axios.post('/api/users/register', user)).data;
      setLoading(false);
      setSuccess('Registration success');

      setName('');
      setNic('');
      setPhone('');
      setEmail('');
      setPassword('');
      setCPassword('');

      setError('');
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError('Registration failed');
    }
  };

  function PageBanner() {
    return (
      <section
       class="img-fluid justify-content-center " className="w-auto p-3 hero-image" 
        
      >
        <div className="text-muted">
          
          
        </div>
      </section>
    );
  }

  return (
    <div>
      
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
        
          {success && <Success message={success} />}
          {error && <Error message={error} />}
          <div className='bs'>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
              <b><i>Full Name</i></b>
              <input
                type='text'
                className='form-control'
                placeholder='R.S.Perera'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

               <b><i>NIC No</i></b>
              <input
                type='text'
                className='form-control'
                placeholder='XXXXXXXXX'
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
               <b><i>Valid Contact Number</i></b>
              <input
                type='text'
                className='form-control'
                placeholder='0xx-xxxxxxx'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
               <b><i>E-mail</i></b>
              <input
                type='text'
                className='form-control'
                placeholder='***@gmail.com'
                icon="envelope"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               <b><i>Password</i></b>
              <input
                type='password'
                className='form-control'
                placeholder=''
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
               <b><i>Confirm Password</i></b>
              <input
                type='password'
                className='form-control'
                placeholder=''
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />

              <button className='btn btn-primary mt-3' type='submit'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Registerscreen;

