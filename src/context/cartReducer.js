const cartReducer = (state , action)=>{
    if (action.type === "selectedColor") {
        return{...state , color:action.payload}
    }

    if (action.type === "decQuntity") {
        return{...state , quantity :  state.quantity > 1 ? state.quantity -1 : state.quantity}
    }

    if (action.type === "incQuntity") {
        return{...state , quantity : state.quantity +1}
    }

    if (action.type === "default") {
        return{...state , quantity : 1 , color:action.payload.colors && action.payload.colors[0] , id:action.payload.id}
    }

    if (action.type === "add") {
        if (state.cart.some(item=> item.id === action.payload.id)) {
            return{...state }
        }
        return{...state , cart: [...state.cart , {id:action.payload.id , color: state.color , quantity : state.quantity ,item: action.payload}]}
    }

    if (action.type === "setLocalEmpty") {
        return{...state , cart:[] }
    }

    
    if (action.type === "incQ") {
        let tempCartInc = state.cart.map(item =>{
            if (item.id === action.payload.id) {
                return{...item , quantity: item.quantity +1}
            }
            return item
        })
        return{...state , cart:tempCartInc }
    }

    
    if (action.type === "decQ") {
        let tempCartDec = state.cart.map(item =>{
            if (item.id === action.payload.id) {
                return{...item , quantity: item.quantity -1}
            }
            return item
        })
        return{...state , cart :tempCartDec }
    }

    if (action.type === "deleteCartItem") {
        let tempDelete = state.cart.filter(item=> item.id !== action.payload) 
       return {...state , cart:tempDelete}
    }

    if (action.type === "getTotal") {
/* 
        const total = state.cart.reduce((acc,product)=> {
            const {quantity , item} = product
            acc += item.price * quantity
            console.log(typeof(acc));
        },{acc:0})
        console.log(typeof(total))
        return{...state , total} */

        let total = 0
        state.cart.forEach(element => {
            total += element.item.price * element.quantity
        });

       return{...state , total:total}

    }

}

export default cartReducer