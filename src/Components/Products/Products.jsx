import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import useAPI from '../Hooks/useApi'
import { BallTriangle } from 'react-loader-spinner';
// import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { UserToken } from './../../Context/UserToken';


export default function Products() {
  let {addToCart , setcartNums} = useContext(CartContext);
  let {isLogin} = useContext(UserToken);

  async function addCart(id){
    let response = await addToCart(id)
    setcartNums(response.data.numOfCartItems)
    if(!isLogin){
      toast.error(response.response.data.message , {
        duration:2000
      });
    }
    else{
      toast.success(response.data.message , {
        duration:1000
      });
    }
    
    }


 let {data , isLoading} = useAPI('products','products' , {
    cacheTime:3000,
        refetchOnMount:false,
 })



  return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Products</title>
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
<h2 className='fw-bolder border-bottom text-center pb-3 pt-3'>TOP <div className=' d-inline text-main fw-bolder'>10</div> PRODUCTS</h2>   
    {data?.data.data.sort((a , b)=>b.ratingsAverage - a.ratingsAverage).slice(0 , 10 ).map((product)=>(
    <div key={product.id} className='col-md-2 gy-4 text-center'>
      <div className='product cursor-pointe p-2'>
        {/* <Link to={`productdetails/${product._id}`}> */}
      <img src={product.imageCover} className='w-100' alt="title" />
      <h2 className='font-sm text-main fw-bold'>{product.category.name}</h2>
      <h2 className='h5 fw-bold'>{product.title.split(' ').slice(0,2).join(' ')}</h2>
      <div className='d-flex justify-content-between'>
        <span>{product.price} EGP </span>
        <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}{' '}</span>
      </div>
      {/* </Link> */}
      <button onClick={()=>addCart(product._id)}  className='btn bg-main text-white w-100 btn-sm'> Add To Cart</button>
      </div>
    </div>
    ))}
  </div>
  )}
    </>
}
