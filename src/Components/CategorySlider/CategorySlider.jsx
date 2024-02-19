import axios from 'axios';
import React from 'react'
import Slider from 'react-slick';
import { useQuery } from 'react-query';
export default function CategorySlider() {
  let baseURL = 'https://ecommerce.routemisr.com';


    
  function getData(){

    return axios.get(`${baseURL}/api/v1/categories`)
}

let {isError , isFetching , isLoading , data , refetch} = useQuery(`categories` , getData , {
    cacheTime:3000,
      refetchOnMount:false,
    //   enabled:false
}
)

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay:true,
        autoplaySpeed:500,
        slidesToShow: 7,
        slidesToScroll: 1
      };

  return <>
    <h2 className='h4 border-bottom pb-2'>Shop Popular Category</h2>
    <div className='my-2 '>
    <Slider {...settings}>
          {data?.data.data.map((category)=> <img  height={200} src={category.image} key={category._id} alt={category.name} className='w-100 fit'></img>)}
      </Slider>
    </div>
    </> 
}
