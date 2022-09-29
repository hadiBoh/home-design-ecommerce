import '../css/nav.css';
import {Link} from 'react-router-dom'
import { useContext} from 'react';
import { CartData } from '../context/Cart';

const Nav = () => {
    const {cart } = useContext(CartData)
    function openNav(){
        document.querySelector(".links").classList.add("active")
        document.querySelector(".cart-log").classList.add("active")
    }
    function closeNav(){
        document.querySelector(".links").classList.remove("active")
        document.querySelector(".cart-log").classList.remove("active")
    }
    
  return (
    <nav className="nav">
        <div className='logo'>
            <img src='../images/logo.221f6b13.svg' alt='logo'></img>
        </div>
        <ul className='links'>
            <div className='insider-nav'>
                <img src='../images/logo.221f6b13.svg' alt='logo'></img>
                <i className='bx bx-x' onClick={closeNav}></i>
            </div>
            <li className='link'>
                <Link className="linkR" onClick={closeNav} to='/'>Home</Link>
            </li>
            <li className='link'>
                <Link className="linkR" onClick={closeNav} to='/about'>About</Link>
            </li>
            <li className='link'>
                 <Link className="linkR" onClick={closeNav} to='/products'>Products</Link>
            </li>
        </ul>
        <div className='cart-log'>
            <Link className='cart-icon' onClick={closeNav } to="/cart"> 
               <span>Cart</span>
               <i className='bx bx-cart'></i> 
               <span className='nav-quantity'>{cart.length}</span>
            </Link>
            <Link  className='log-icon' onClick={closeNav}>
                <span>Login</span>
                <i className='bx bx-log-in-circle' ></i>
            </Link>
        </div>
        <button className='menu' onClick={openNav}><i className='bx bx-menu'></i></button>
    </nav>
  )
}

export default Nav