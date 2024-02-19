import React from 'react'
import { useState, useEffect } from 'react';

export default function useNetwork() {
    const [isOnline, setisOnline] = useState(true);
    useEffect(()=>{
        detectOnline()
    } , [])

    function detectOnline(){

        window.addEventListener('online' , function(){
            setisOnline(true)
        })
    
        window.addEventListener('offline' , function(){
            setisOnline(false)
        })

    }
   

  return <>
  {!isOnline?<div className='offline'><i className='fas fa-wifi p-2'></i>You Are Offline</div>:''}
  
  
  </>
}
