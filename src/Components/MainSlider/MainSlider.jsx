import React from 'react'
import Slider from 'react-slick';
import slide1 from '../../Assets/IMG/slider-image-1.jpg'
import slide2 from '../../Assets/IMG/slider-image-2.jpg'
import slide3 from '../../Assets/IMG/slider-image-3.jpg'
import img1 from '../../Assets/IMG/img1.jpg'
import img2 from '../../Assets/IMG/img2.jpg'




export default function MainSlider() {

     // Slider
   var settings = {
    dots: true,
    infinite: true,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return <>
  <div className="row gx-0 mb-2">
    <div className="col-md-10">
      <Slider {...settings}>
        <img src={slide1} height={500} className='w-100' alt="slide1" />
        <img src={slide2} height={500} className='w-100' alt="slide2" />
        <img src={slide3} height={500} className='w-100' alt="slide3" />
      </Slider>
    </div>
    <div className="col-md-2">
      <img src={img1}height={250} className='w-100' alt="img1" />
      <img src={img2}height={250} className='w-100' alt="img2" />

    </div>
  </div>
  </>
}
