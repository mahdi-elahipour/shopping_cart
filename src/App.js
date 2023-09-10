import Products from "./Components/Products";
import store from './Redux/Store';
import { Provider } from "react-redux";
import style from './app.module.css'
import { Routes, Route } from 'react-router-dom';
import ProductDetails from "./Components/ProductDetails";
import Navbar from "./Components/Navbar";
import Cart from "./Components/Cart";
const App = () => {

    return (
        <Provider store={store}>
            <div id={style.wrapper}>
                <Navbar />
                <Routes>
                    <Route path="/products/:id" element={<ProductDetails/>}/>
                    <Route path='/products' element={<Products/>} />
                    <Route path='/cart' element={<Cart/>} />
                    <Route path='/' element={<Products/>} />
                </Routes>
            </div>
        </Provider>
    );
};

export default App;