import React from 'react'

export default function Footer() {
  return <>

  <footer className='bg-main-light'>
    <div className='container'>
    <h1>Get The FreshCart App</h1>
    <p>we will send you a link</p>
    <div className='row'>
      <div className='col-md-9'>
        <input type="text" className='form-control' placeholder="Email" />
      </div>
      <div className='col-md-3'>
        <button className='btn bg-main form-control'>Send a Link</button>
      </div>
    </div>
    </div>
   
  </footer>
  
  
  </>
}
