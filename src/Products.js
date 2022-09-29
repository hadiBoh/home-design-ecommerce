import './css/products.css'
import { useContext } from 'react'
import { DataFetch } from './context/DataFetch'
import Image from './components/Image'
import { Link } from 'react-router-dom'
import { CartData } from './context/Cart'



const Products = () => {

  const { 
    filteredData,
    handleprice,
    filter,
    filters,
    grid,
    navFilter
  } = useContext(DataFetch)

  const {setDefalt} = useContext(CartData)


  return (
    
    <div className='products'>
      <div className='product__top'>
        <h1>Home /</h1><h2>products</h2>
      </div>

      <div className='P__Body'>
        <div className='P__Left'>
          <form className='form' onSubmit={(e) => e.preventDefault()}>
            <div className='form__control' id='search'>
              <input className='form__input' placeholder='Search' name='search' onChange={(e) => filter(e)} />
            </div>
            <div className='form__control' id='catagory'>
              <h3>catagory</h3>
              <div id='catagory-btn'>
                <button name='category' className='active' id="all" onClick={(e) => filter(e)}>All</button>
                <button name='category' id="office" onClick={(e) => filter(e)}>Office</button>
                <button name='category' id="living room" onClick={(e) => filter(e)}>Living room</button>
                <button name='category' id="kitchen" onClick={(e) => filter(e)}>Kitchen</button>
                <button name='category' id="bedroom" onClick={(e) => filter(e)}>Bedroom</button>
                <button name='category' id="dining" onClick={(e) => filter(e)}>Dining</button>
                <button name='category' id="kids" onClick={(e) => filter(e)}>Kids</button>
              </div>
            </div>
            <div className='form__control' id='company'>
              <h3>Company</h3>
              <select className='company' name='company' onChange={(e)=>filter(e)}>
                <option>all</option>
                <option>marcos</option>
                <option>liddy</option>
                <option>ikea</option>
                <option>caressa</option>
              </select>
            </div>
            <div className='form__control' id='color'>
              <h3>color</h3>
              <div className='color-btn-wrapper'>
                <button onClick={(e)=>filter(e)} name="color" id='all' className='button active'>All</button>
                <button onClick={(e)=>filter(e)} name="color" id='#FF0000' className='button'></button>
                <button onClick={(e)=>filter(e)} name="color" id='#00FF00' className='button'></button>
                <button onClick={(e)=>filter(e)} name="color" id='#000' className='button'></button>
                <button onClick={(e)=>filter(e)} name="color" id='#0000FF' className='button'></button>
                <button onClick={(e)=>filter(e)} name="color" id='#FFb900' className='button'></button>
              </div>
            </div>
            <div className='form__control' id='price'>
              <h3>price</h3>
              <div className="range-wrapper">
                <span>${filters.range}</span>
                <input type='range' name='range' min='30' max='10000'  defaultValue={filters.range} onChange={filter} />
              </div>
            </div>
            <div className='form__control' id='shipping'>
              <h3>free shipping</h3>
              <input type="checkbox"  name='shipping' checked ={filters.shipping} onChange={filter}/>
            </div>
            <div className='form__control'>
              <button id='dFilter' name='dFilter' onClick={navFilter}>clear filters </button>
            </div>
          </form>
        </div>
        <div className='P__Right'>
          <div className='products__options'>
            <div className='filter-btn-wrapper'>
              <button name='showgrid' onClick={(e)=>navFilter(e)} className={`nav-filter grid-show ${grid === "sidebyside" ? "active" : ""}`}><i className='bx bxs-grid'></i></button>
              <button name='showblock' onClick={(e)=>navFilter(e)} className={`nav-filter block-show ${grid === "block" ? "active" : ""}`} ><i className='bx bx-menu'></i></button>
            </div>
            <p>{filteredData.length} products found</p>
            <span></span>
            <div className='drop'>
              <select name='option-filter' onChange={(e)=>navFilter(e)}>
                <option>Price Lowest</option>
                <option>Price Highest</option>
                <option>{"name (a-z)"}</option>
                <option>{"name (z-a)"}</option>
              </select>
            </div>
          </div>
          
          <div className={`products_in_pPage ${grid}`}>
         
            { filteredData.map((item) => {
              
                return (
                  <div className={`feature__card ${grid === "block" ? "block-active" : ""}`} key={item.id}>
                    <div className='img-wrapper skelton'>
                      <div className='modal'></div>
                      <Image item={item} />
                      <Link to={ `./${item.id}`} onClick={()=>setDefalt(item)}  /* target="_blank" */ className='modalbtn'><i className='bx bx-search-alt-2'></i></Link>
                    </div>
  
                    <div className="describe">
                      <p>{item.name}</p>
                      <span>${handleprice(item)}</span>
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>
    </div>

  )
}

export default Products