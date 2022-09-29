import About from "./About";
import Cart from "./Cart";
import Home from "./Home";
import Products from "./Products";
import Product from "./Product";
import NotFound from './NotFound'
import { Routes, Route } from 'react-router-dom'


const Main = () => {


    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/products' element={<Products/>} />
            <Route path='/products/:id' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Main