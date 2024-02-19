import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext'
import { UserToken } from './../../Context/UserToken';
import { BallTriangle } from 'react-loader-spinner';
import { Link } from 'react-router-dom';



export default function Cart() {
  const [loading, setloading] = useState(true);
  const [cartdata, setCartdata] = useState(null)
  let {isLogin} = useContext(UserToken)
  let {getCart , removeCartItem , update , setcartNums } = useContext(CartContext);

//? 1)
  async function getCartFun(){
    // setloading(true)
    let response = await getCart()
    if(response?.data?.status === 'success'){
      setCartdata(response?.data)
      setcartNums(response.data.numOfCartItems)
    }
    setloading(false)
  }

  useEffect(()=>{
    if(isLogin == null)
    return
    getCartFun()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  } , [isLogin])


  //? 2)
  async function remveItem(id){
    let response = await removeCartItem(id)
    if(response.data.status === `success`)
    setcartNums(response.data.numOfCartItems)
    getCartFun()
   }


   //? 3)
  async function updateCount(id , count){
    let response = await update(id , count)
    if(response.data.status === `success`)
    setcartNums(response.data.numOfCartItems)
    getCartFun()
   }
  return<>

            <Helmet>
                <meta charSet="utf-8" />
                <title>Cart</title>
            </Helmet>

  {loading ?<div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
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
    </div>:
     <div className='bg-main-light p-4'>
     <h2 className='fw-bold'>Shop Cart</h2>
     {!cartdata?.data.totalCartPrice ? <h2 className='text-main '>
        <p className='h3 fw-bold'>your cart is empty</p>
      </h2> : <div>
        <h3 className='h5 my-3 text-main'>{'Total Price ' +  cartdata?.data.totalCartPrice }</h3>
        </div>}

     {/* <h2 className='h5 text-main'>Total Price <span className='text-dark fw-bold'>{cartdata?.data.totalCartPrice}</span> <span className='text-dark'>EGP</span></h2> */}
     {!cartdata?.numOfCartItems ? <h2 className='text-main '>
     </h2> : <div>
     <h3 className='h5 my-3 text-main'>{'Total Cart Items ' +  cartdata?.numOfCartItems}</h3>
        </div>}



     {/* <h2 className='h5 text-main'>Total Cart Items <span className='text-danger fw-bold'>{cartdata?.numOfCartItems}</span></h2> */}
     {cartdata?.data.products.map((prod)=><div key={prod.product._id} className='row p-3 border-bottom'>
        <div className='col-md-1'>
            <img src={prod.product.imageCover} className='w-100' alt="title" />
        </div>
        <div  className='col-md-11 d-flex justify-content-between'>
          <div>
            <h2 className='h6 fw-bold'>{prod.product.title.split(' ').slice(0,7).join(' ')}</h2>
            <h2 className='h6 text-main fw-bold'>Price : {prod.price} EGP</h2>
            <button onClick={()=>remveItem(prod.product._id)}  className='btn p-0'><i className='fas fa-trash-can text-danger'></i> Remove</button>
          </div>
          <div>
            <button onClick={()=>{updateCount(prod.product._id , prod.count +1)}} className='btn btn-sm border me-1'>+</button>
            <span className='pe-2'> {prod.count}</span>
            <button onClick={()=>{updateCount(prod.product._id , prod.count > 0 ?prod.count -1 :0)}} className='btn btn-sm border me-1'>-</button>
          </div>
        </div>
        
     </div> )}
     {/* <button className='btn bg-main text-white mt-3 w-25 fw-bold'>Check Out</button> */}
     <Link to={`/address/${cartdata?.data._id}`} className='btn m-2 bg-main text-white mt-3'>CheckOut</Link>

 </div>
 }

   </>
}
