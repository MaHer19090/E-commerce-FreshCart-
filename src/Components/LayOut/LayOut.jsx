import React from 'react'
import NavBar from './../NavBar/NavBar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
export default function LayOut() {
  return<>
  <NavBar></NavBar>
  {/* <div className='container'> */}
  <Outlet></Outlet>
  {/* </div> */}
  <Footer></Footer>
  
  
  </>
}
