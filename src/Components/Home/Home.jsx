import React from 'react'
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts'
import CategorySlider from './../CategorySlider/CategorySlider';
import MainSlider from './../MainSlider/MainSlider';
import { Helmet } from 'react-helmet';
import useNetwork from './../Hooks/useNetwork';

export default function Home() {

    let x = useNetwork()
  return <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home</title>
            </Helmet>
            {x}
    <MainSlider></MainSlider>
    <CategorySlider></CategorySlider>
    <FeaturedProducts></FeaturedProducts>
    </>
}
