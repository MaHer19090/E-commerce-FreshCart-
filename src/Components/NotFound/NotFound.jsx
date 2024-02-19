import React from 'react'
import error from '../../Assets/IMG/error.svg'

export default function NotFound() {
  return <>
  <div className='w-50 mx-auto text-center my-3'>
    <h2 className='my-3'>Not Found</h2>
    <img src={error} alt="notfound" className='w-100' />
  </div>
    
    </>
}
