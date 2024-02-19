import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useState } from 'react'
import axios from 'axios'
import { BallTriangle } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';



export default function Register() {

  let navigate =useNavigate(``);
  let [error, setError] = useState(null);
  let [isloading, setIsLoading] = useState(false);

  let baseURL = 'https://ecommerce.routemisr.com';

  async function submitRegister(values){
    setIsLoading(true);
    let {data} = await axios.post(`${baseURL}/api/v1/auth/signup`,values)
    .catch((err)=>{
    setIsLoading(false);
      setError(err.response.data.message)
    })

    if(data.message === 'success'){
    setError(null)
    setIsLoading(false);
    navigate('/login');

    }
  }
  // let phoneRegex = /^01[0125][0-9]{8}$/
  let validation = Yup.object({
    name :Yup.string().min(3,'Name MinLength Is 3 ').max(20, 'Name MaxLength Is 20').required('Name Is Required'),
    email: Yup.string().email('Email Invalid').required('Email Is Required'),
    phone:Yup.string().matches(/^(002)?01[0-25][0-9]{8}$/,'Phone Invalid').required('Phone Is Required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'Password Invalid Password Must Start With UpperCase').required('Password Is Required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'Password & RePassword Doesn`t Match').required(' RePassword Is Required')
  })

  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:''
    },validationSchema:validation, onSubmit:submitRegister 
  })
  return <>
   {error !== null ?<div className='alert alert-danger text-center'>{error}</div>:''}
  <h3 className='text-center py-2'>Register Now</h3>
   <form className='w-75 mx-auto pb-3' onSubmit={formik.handleSubmit}>
    <label htmlFor="name">Name:</label>
    <input type="text" name="name" id="name" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
    {formik.errors.name && formik.touched.name?<div className='alert alert-danger mt-2 p-2'>{formik.errors.name}</div>:''}

    <label htmlFor="email">Email:</label>
    <input type="email" name="email" id="email" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
    {formik.errors.email && formik.touched.email?<div className='alert alert-danger mt-2 p-2'>{formik.errors.email}</div>:''}

    <label htmlFor="phone">Phone:</label>
    <input type="tel" name="phone" id="phone" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone}/>
    {formik.errors.phone && formik.touched.phone?<div className='alert alert-danger mt-2 p-2'>{formik.errors.phone}</div>:''}

    <label htmlFor="password">Password:</label>
    <input type="password" name="password" id="password" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
    {formik.errors.password && formik.touched.password?<div className='alert alert-danger mt-2 p-2'>{formik.errors.password}</div>:''}

    <label htmlFor="rePassword">RePassword:</label>
    <input type="password" name="rePassword" id="rePassword" className='form-control mb-3' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword}/>
    {formik.errors.rePassword && formik.touched.rePassword?<div className='alert alert-danger mt-2 p-2'>{formik.errors.rePassword}</div>:''}


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
    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main mt-2'>Register</button>}
   </form>
  
  </>
}
