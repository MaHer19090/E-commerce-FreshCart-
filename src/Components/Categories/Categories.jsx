import React from 'react'
import { Helmet } from 'react-helmet';
import useAPI from '../Hooks/useApi';
import { BallTriangle } from 'react-loader-spinner';



export default function Categories() {
let {data , isLoading} = useAPI('categories','categories' , {
      cacheTime:3000,
      refetchOnMount:false,
})



return <>
          <Helmet>
              <meta charSet="utf-8" />
              <title>Categories</title>
          </Helmet>
          {isLoading ?(
  <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
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
<div className='row p-2'> 
<h2 className='fw-bolder text-main border-bottom text-center pb-3 pt-3'>CATEGORIES</h2>   
  {data?.data.data.map((cat)=>(
  <div key={cat._id} className='col-md-2 gy-2 text-center'>
    <div className='product p-2'>
    <img src={cat.image} className='w-100' height={180} alt={cat.name} />
    <h2 className='font-sm text-main p-2 fw-bold'>{cat.name}</h2>
      <span>{cat.slug}</span>
    </div>
  </div>
  ))}
</div>
)}
  </>
}


