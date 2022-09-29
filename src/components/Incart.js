import { CartData } from "../context/Cart"
import { DataFetch } from "../context/DataFetch"
import { useContext } from "react"

const Incart = ({incCartQuantity , decCartQuantity , deleteCartItem ,showsubtotal}) => {

    const { cart } = useContext(CartData)
    const { handleprice } = useContext(DataFetch)
    return (
        cart.map(product => {
            return (
                <section className="cart__products" key={product.id}>
                    <div className="cart__img skelton">
                        <img src={product.item.images[0].url} alt={product.item.name} />
                    </div>
                    <div className='info_pcn'>
                        <div className='info_cn'>
                            <p className='info_n'>{product.item.name.charAt(0).toUpperCase() + product.item.name.slice(1)}</p>
                            <p className="info_c_wra">color : <span className='info_c' style={{ background: product.color }}></span></p>
                        </div>
                        <span className='info_p'>${handleprice(product.item)}</span>
                    </div>
                    <div className='quantity_cart'>
                        <button className="info__q__minus" onClick={()=>decCartQuantity(product)}>-</button>
                        <span>{product.quantity}</span>
                        <button className="info__q__plus" onClick={()=>incCartQuantity(product)}>+</button>
                    </div>
                    <div className='delete_cart_btn'>
                        <button onClick={()=>deleteCartItem(product.id)}><i className='bx bxs-trash'></i></button>
                    </div>
                </section>
            )
        })
    )
}

export default Incart