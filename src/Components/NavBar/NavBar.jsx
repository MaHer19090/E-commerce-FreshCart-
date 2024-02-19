import React, { useContext } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import logo from '../../Assets/IMG/freshcart-logo.svg'
import { UserToken } from '../../Context/UserToken';
import { CartContext } from '../../Context/CartContext';


export default function NavBar() {

  
  let navigate = useNavigate()
  let {cartNums}= useContext(CartContext);

  let {isLogin , setIsLogin} =  useContext(UserToken) 

  function logout(){
    localStorage.removeItem(`userToken`)
    setIsLogin(null)
    navigate('/')
  }
  return <>
  <nav
    className=" navbar navbar-expand-sm navbar-light bg-light"
  >
    <div className="container ">
      <Link className="navbar-brand" to="/">
      <img src={logo} alt="fresh market logo"/>
    </Link>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link to={'/'} className="nav-link">Home</Link>
          </li>
          {isLogin?
          <li className="nav-item">
            <Link to={'cart'} className="nav-link">Cart<i className='fa-solid fa-cart-shopping fs-6 text-main'> {cartNums}</i></Link>
          </li>:''}
          <li className="nav-item">
            <Link to={'products'} className="nav-link">Products</Link>
          </li>
          <li className="nav-item">
            <Link to={'categories'} className="nav-link">Categories</Link>
          </li>
          <li className="nav-item">
            <Link to={'brands'} className="nav-link">Brands</Link>
          </li>
        </ul>

        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
        <li className="nav-item d-flex align-items-center">
        <i className='fab fa-facebook mx-2'></i>
        <i className='fab fa-twitter mx-2'></i>
        <i className='fab fa-instagram mx-2'></i>
        <i className='fab fa-tiktok mx-2'></i>
        </li>
        {!isLogin?<>
          <li className="nav-item">
            <Link to={'register'} className="nav-link">Register</Link>
          </li>
          <li className="nav-item">
            <Link to={'login'} className="nav-link">Login</Link>
          </li>
        </>: <li className="nav-item">
            <span  className="nav-link cursor-pointer" onClick={()=>logout()}>Logout</span>
          </li>}
        </ul>
        
        
      </div>
    </div>
  </nav>
  
  </>
}
