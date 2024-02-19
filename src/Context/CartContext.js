import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'
import { UserToken } from './UserToken';


export let CartContext = createContext()

export default function CartContextProvider(props) {


  const [cartNums, setcartNums] = useState(null)

  let {isLogin} =  useContext(UserToken) ;
  let headers = {token : isLogin}
  let baseURL = 'https://ecommerce.routemisr.com';



    //? 1) Add To Cart
    function addToCart(productId){
        return axios.post(`${baseURL}/api/v1/cart`, {
            productId
        } , {
            headers
        }).then((response)=>response)
          .catch((err)=>err)
    } 

    //! 2) Get Cart
    function getCart(){
        return axios.get(`${baseURL}/api/v1/cart`, 
        {
            headers
        }).then((response)=>response)
          .catch((err)=>err)
    } 

    //todo 3) Delete Item From Cart
    function removeCartItem(id){
        return axios.delete(`${baseURL}/api/v1/cart/${id}` , {
            headers 
        })
        .then((response)=>response)
        .catch((err)=>err)
    }

     //? 4) Update Count
     function update(id , count){
      return axios.put(`${baseURL}/api/v1/cart/${id}` , {count},{ headers })
      .then((response)=>response)
      .catch((err)=>err)
  }

    //! 5) CheckOut
    function onlinePayment(cartId , shippingAddress){
        return axios.post(`${baseURL}/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress},{headers})
        .then((response)=>response)
        .catch((err)=>err)
    } 


    


  return <>
<CartContext.Provider value={{addToCart , getCart , removeCartItem , update ,cartNums , setcartNums , onlinePayment}}>
    {props.children}
</CartContext.Provider>
  </>
}
