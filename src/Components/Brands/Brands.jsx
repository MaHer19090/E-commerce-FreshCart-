import React from 'react'
import { Helmet } from 'react-helmet'
import { BallTriangle } from 'react-loader-spinner';
import useAPI from '../Hooks/useApi';





export default function Brands() {

 let {data , isLoading} = useAPI('brands','brands' , {
    cacheTime:3000,
        refetchOnMount:false,
 })



  return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Brands</title>
            </Helmet>
{isLoading ?(
    <div className='w-100 py-5 d-flex justify-content-center'>
      <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
    </div>
  ):(
<div className='row text-center'>   
            {data?.data.data.map((brand)=><div key={brand._id} className='col-md-3'>
                <img  src={brand.image} className='w-100' alt={brand.name} />
                <p className='fw-bolder'>{brand.name}</p>
            </div>)}
      </div>
      
  )
}


    </>
}
