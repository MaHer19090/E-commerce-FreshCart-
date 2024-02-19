import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { UserToken } from '../../Context/UserToken';





export default function Login() {
  let {setIsLogin} =  useContext(UserToken) ;
  let navigate =useNavigate(``);
  let [error, setError] = useState(null);
  let [isloading, setIsLoading] = useState(false);

  let baseURL = 'https://ecommerce.routemisr.com';

 async function submitLogin(values){
    setIsLoading(true);
    let {data} = await axios.post(`${baseURL}/api/v1/auth/signin`,values)
    .catch((err)=>{
    setIsLoading(false);
      setError(err.response.data.message)
    })

    if(data.message === 'success'){
    setError(null)
    setIsLoading(false);
    localStorage.setItem('userToken',data.token);
    setIsLogin(data.token)
    navigate('/')
    }
  }

  let validation = Yup.object({
    email: Yup.string().email('Email Invalid').required('Email Is Required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password Invalid Password Must Start With UpperCase').required('Password Is Required'),
  })

  let formik = useFormik({
    initialValues:{
      email:'',
      password:''
    },validationSchema:validation, onSubmit:submitLogin 
  })
  return <>
   {error !== null ?<div className='alert alert-danger text-center'>{error}</div>:''}
  <h3 className='text-center py-2'>Login Now</h3>
   <form className='w-75 mx-auto pb-3' onSubmit={formik.handleSubmit}>
    <label htmlFor="email">Email:</label>
    <input type="email" name="email" id="email" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
    {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:''}

    <label htmlFor="password">Password:</label>
    <input type="password" name="password" id="password" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
    {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:''}

    {isloading ?
        <button className='btn bg-main text-white mt-2' type="button">

<BallTriangle
  height={20}
  width={65}
  radius={5}
  color="white"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  /> </button>:
    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main mt-2'>Login</button>}
   </form>
  
  </>
}
