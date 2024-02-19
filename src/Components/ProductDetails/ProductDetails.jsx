import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { UserToken } from './../../Context/UserToken';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';



export default function ProductDetails() {
    

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

   // Slider
   var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

// ده جاي من ال App
  let {id} = useParams()
  let baseURL = 'https://ecommerce.routemisr.com';



  function getData(){

    return axios.get(`${baseURL}/api/v1/products/${id}`)
}

let {isError , isFetching , isLoading , data , refetch} = useQuery(`productDetails` ,getData, {
    cacheTime:3000,
      refetchOnMount:false,
    //   enabled:false
}
)






  return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{data?.data.data.title}</title>
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
<div className='row py-2 align-items-center'>    
    <div className='col-md-4'>
        <Slider {...settings}>
      {data?.data.data.images.map((image)=><img src={image}key={data?.data.data.id} alt={data?.data.data.title} className='w-100'></img>)}
    </Slider>
      </div>
    <div className='col-md-8 py-5 align-items-center'>
      {/* <div className='bg-dark'> */}
      <h2 className='h4 mb-3'>{data?.data.data.title}</h2>
      <p className='text-muted'>{data?.data.data.description}</p>

      <h6 className='text-main'>{data?.data.data.category.name}</h6>

      <div className='d-flex mb-2 justify-content-between'>
      <span className='fw-bolder'>Rating Quantity : {data?.data.data.ratingsQuantity}</span>

      <span className='mb-2 text-main fw-bolder'>{data?.data.data.price} EGP</span>
      <span className='fw-bolder'>
        <i className='fas fa-star rating-color'></i>{data?.data.data.ratingsAverage}
        </span>
      </div>
      <button onClick={()=>addCart(data?.data.data._id)} className='btn bg-main w-100 text-white'>Add To Cart</button>
      </div>
    </div>
      
  // </div>
  )
}
  
  </>
}
