import React from 'react';
import style from '../app.module.css';
import isNotEmptyCart from '../images/notEmpty_cart.png'
import emptyCart from '../images/empty_cart.png'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
const Navbar = () => {
    const store=useSelector(state=>state.cart)
    return (
        <ul className={style.navbar}>
                <li><Link to='/products'>Products</Link></li>
                <li><Link to='/cart'>{ <img src={store.selectedItems.length>0 ? isNotEmptyCart :emptyCart} alt='isnotempty'/>}</Link>{store.quantity ? <span>{store.quantity}</span> : ''}</li>
        </ul>
        
    );
};

export default Navbar;