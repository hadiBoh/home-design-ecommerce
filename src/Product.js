import "./css/product.css"
import { useContext, useEffect, useState} from 'react'
import { DataFetch } from './context/DataFetch'
import { useParams , Link } from "react-router-dom"
import Stars from "./components/Stars"
import { CartData } from "./context/Cart"
/* import { useLocation } from "react-router-dom" */



const Product = () => {

  const id = useParams().id
  
  const [full , setFull] = useState(null)
  const [half , setHalf] = useState(null)
  const [empty , setEmpty] = useState(null)
  const { handleprice , singleProduct , setId ,loading  } = useContext(DataFetch)
  const { selectColor , handleQuntity ,quantity ,addToCart ,setDefalt } = useContext(CartData)

  useEffect(()=>{
    setId(id)
  },[])





  function setStar(stars){
    setDefalt(singleProduct)
      const ful = Math.floor(stars)
      let fulArray = [...Array(ful)].map(x => 0);


      const haf = stars - ful > 0 ? 1 :0
      let hafArray = [...Array(haf)].map(x => 0);


      const emp = 5 - Math.ceil(stars)
      let empArray = [...Array(emp)].map(x => 0);


      setFull(fulArray)
      setHalf(hafArray)
      setEmpty(empArray)
  }

/* console.log(singleProduct); */
  if (loading === true) {
    return(
      <div className='product__wrapper'>
        <i className="fa fa-spinner fa-pulse"></i>
      </div>
    )
  }else{
  return (
    singleProduct ?
    <div className='product__wrapper'>
      <div className='product__top'>
        <h1>Home / </h1><h2>products</h2><h2> / {singleProduct.name}</h2>
      </div>
      <div className='product__body'>
        <button className="go-back-info all__btn">go back to products</button>
        <div className='product__main'>
          <section className="product__gallery">
            <img src={`${singleProduct.images[0].thumbnails.full.url}`} alt="pic" />
            <div className="footer__gallery">
             { singleProduct.images.map((img,index)=>{
                return(
                  <img key={index} src={`${img.thumbnails.full.url}`} alt="pic" />
                )
              })
            }
            </div>
          </section>
          <section className="product__info">
            <h2>{singleProduct.name}</h2>
            <div className="stars">
                <Stars
                  full={full}
                  half = {half}
                  empty={empty}
                  setStar={setStar}
                  singleProduct={singleProduct}
                 />
                 
              <span className="star-span">{singleProduct.stars} stars out of {singleProduct.reviews} reviews</span>
            </div>
            <h2 className="info__price">${handleprice(singleProduct)}</h2>
            <div className="desc">{singleProduct.description}</div>
            <div className="product__p available "><h3>available : </h3> &nbsp; {singleProduct.stock}</div>
            <div className="product__p suk "><h3>SUK : </h3> &nbsp; {singleProduct.id}</div>
            <div className="product__p brand "><h3>Brand : </h3> &nbsp; {singleProduct.company}</div>
            <hr />
            <div className="available-colors">
              <h3>colors</h3>
              {singleProduct.colors.map((clr,i)=>{
                return(
                  i === 0 ?
                  <button className="info-clr active" id={clr} onClick={selectColor} key={clr} style={{background:clr}} ></button>
                  :
                  <button className="info-clr" id={clr} onClick={selectColor} key={clr} style={{background:clr}} ></button>
                )
              })}
            </div>
            <div className="info__quantity">
              <button onClick={handleQuntity} name="dec" className="info__q__minus">-</button>
              <span>{quantity}</span>
              <button onClick={handleQuntity} name ="inc" className="info__q__plus">+</button>
            </div>
            <Link onClick={()=>addToCart(singleProduct)} to="../cart" className="add-to-cart-btn all__btn ">add to cart</Link>

          </section>
        </div>
      </div>
    </div>
    :

    <div className='product__wrapper'>
      empty
    </div>
  )
  }

}

export default Product