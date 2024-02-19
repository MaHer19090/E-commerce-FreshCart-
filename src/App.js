import React, { useEffect , useContext} from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Home from './Components/Home/Home';
import Categories from './Components/Categories/Categories';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import { UserToken } from './Context/UserToken';
import ProtectedRoute from './Components/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { Toaster } from 'react-hot-toast';
import Address from './Components/Address/Address';
import Orders from './Components/Orders/Orders';
import Brands from './Components/Brands/Brands';



export default function App() {
// علشان لما اعمل لودنج ميخرجش ويبقي لوج اوت
  let {setIsLogin} = useContext(UserToken)
  useEffect(()=>{
    if(localStorage.getItem(`userToken`)){
      setIsLogin(localStorage.getItem(`userToken`))
    }
  } , [setIsLogin])

  let routers = createBrowserRouter([
    {path:'/' , element:<LayOut></LayOut> , children:[
      {index : true , element :<Home></Home>},
      {path:'categories' , element :<Categories></Categories>},
      {path:'login' , element :<Login></Login>},
      {path:'register' , element :<Register></Register>},
      {path:'products' , element :<Products></Products>},
      {path:'productdetails/:id' , element :<ProductDetails></ProductDetails>},
      {path:'cart' , element :<ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path:'brands', element :<Brands></Brands>},
      {path:'address/:id' , element :<Address></Address>},
      {path:'allorders' , element :<Orders></Orders>},
      {path:'*' , element :<NotFound></NotFound>},

    ]}
  ])
  return <>
  <div className='container'>
  <RouterProvider router={routers}></RouterProvider>
  <Toaster></Toaster>
  </div>
    
  
  
  </>
}
