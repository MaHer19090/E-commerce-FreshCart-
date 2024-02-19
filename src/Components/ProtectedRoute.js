import React from 'react'
import {Navigate } from 'react-router-dom';

export default function ProtectedRoute(props) {
  
    // Login
  if(localStorage.getItem('userToken' ) !== null){
      return props.children;
    }
    // Not Login
    else
    {
      return <Navigate to={'/login'}></Navigate>
    }
}
