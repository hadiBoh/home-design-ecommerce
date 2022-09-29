import { createContext, useEffect, useReducer } from "react";
import cartReducer from "./cartReducer"

export const CartData = createContext()

const CartDataProvider = (props)=>{

    const initial = {
        color:"",
        quantity:1,
        id :"",
        cart:getLocal()
    }





    function setDefalt(item){
       dispatch({type:"default" , payload:item})
    }

    function addToCart (item){
        dispatch({type:"add" , payload:item})
    }


    const [state , dispatch] = useReducer(cartReducer , initial)


    useEffect(()=>{
        localStorage.setItem("cart" , JSON.stringify(state.cart))
    },[state.cart])

    function selectColor(e){
        document.querySelector(".info-clr.active").classList.remove("active")
        e.target.classList.add("active")
        const color = e.target.id
        dispatch({type:"selectedColor" , payload:color})
    }

    function handleQuntity(e){
        e.target.name === "inc"?
            dispatch({type:"incQuntity"})
        :
        dispatch({type:"decQuntity"})
    }


    function getLocal(){
        const result = localStorage.getItem("cart")
        if (result) {
            return JSON.parse(result)
        }else{
            return []
        }
    }

    function setLocalEmpty(){
        dispatch({type:"setLocalEmpty"})
    }


    function decCartQuantity(product){
        if (product.quantity < 2) return
        dispatch({type:"decQ" , payload:product})
    }
    function incCartQuantity(product){
        dispatch({type:"incQ" , payload:product})
    }

    function deleteCartItem(id){
        dispatch({type:"deleteCartItem" , payload:id})
    }

    function showsubtotal(){
        dispatch({type:"getTotal"})
    }

return(
    <CartData.Provider value={{...state ,selectColor ,handleQuntity , setDefalt ,addToCart ,getLocal ,setLocalEmpty,
        decCartQuantity , incCartQuantity , deleteCartItem , showsubtotal }}>
        {props.children}
    </CartData.Provider>
)

}

export default CartDataProvider