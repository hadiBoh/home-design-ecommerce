import "./css/cart.css"
import React, { useEffect } from 'react'
import { useContext } from 'react'
import { CartData } from './context/Cart'
import { Link } from "react-router-dom"
import Incart from "./components/Incart"



const Cart = () => {
  const {cart , setLocalEmpty , incCartQuantity , decCartQuantity ,deleteCartItem , showsubtotal ,total} = useContext(CartData)

const formatPrice = (number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number / 100)
  }

  useEffect(()=>{
    showsubtotal()
  },[cart])

if (cart.length !== 0) {
  return (
    
    <div className='cart'>
      <div className='product__top'>
        <h1>Home /</h1>
        <h2> Cart</h2>
      </div>
      <section className="cart__products_header">
        <h4>item</h4>
        <div>
        <h4>info</h4>
        <h4>price</h4>
        </div>
        <h4>quantity</h4>
        <h4>action</h4>
      </section>

      <hr/>

    <Incart 
      incCartQuantity={incCartQuantity}
      decCartQuantity={decCartQuantity}
      deleteCartItem={deleteCartItem}
      showsubtotal={showsubtotal}
    />

      <hr/>

      <div className="cart__clr_cont___btn">
        <Link className="all__btn" to="../products">continue shopping</Link>
        <Link className="all__btn" onClick={setLocalEmpty}>clear shopping cart</Link>
      </div>

      <section className="shipping__section">
        <article>
          <h5>subtotal <span>{formatPrice(total)+""}</span></h5>
          <p>shipping <span>50</span></p>
          <h4>total <span>{formatPrice(total+50)+""}</span></h4>
        </article>
        <button className="all__btn">buy</button>
      </section>
    </div>
  ) 
}else{
  return (
    
    <div className='cart'>
      <div className='product__top'>
        <h1>Home /</h1>
        <h2> Cart</h2>
      </div>
      <div className="empty_wr">
        <h3 className="empty">cart is empty!</h3>
        <Link className="all__btn" to="../products">go shipping</Link>
        </div>
      
    </div>
  )
}

}

export default Cart