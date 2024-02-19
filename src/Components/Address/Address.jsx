import React, { useContext }  from 'react'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';




export default function Address() {
    let {id} = useParams()
    // console.log(id);
  let {onlinePayment} = useContext(CartContext)

 async function checkout(values){
   let response = await onlinePayment(id , values)
   console.log(response);
   if(response?.data.status === 'success'){

   window.location.href = response?.data.session.url;

   }
  }

  let formik = useFormik({
    initialValues:{
      details:'',
      phone :'',
      city :''
    }, 
    onSubmit:checkout
  })


  return <>
  
  <div className='container'>
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details">Detalis</label>
      <input type='text' name='details' id='details' value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2 '/>

      <label htmlFor="phone">Phone</label>
      <input type='phone' name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2 '/>

      <label htmlFor="city">City</label>
      <input type='text' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-2 '/>

      <button type='submit' className='btn bg-main text-white'>Pay Now</button>
    </form>
  </div>
  </>
}
