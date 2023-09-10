import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import style from '../app.module.css';
import { clearCart } from '../Redux/Cart/cartAction';


const CartItemsSidebar = () => {
    const dispatch = useDispatch();
    const store = useSelector(state => state.cart)

    return (
        <div className={style.cart_sidebar}>
            <ul>
                <li><span>total price: </span><h3>{store.totalPrice}</h3></li>
                <li><span>quantity : </span><h3>{store.quantity}</h3></li>
                <button onClick={() => dispatch(clearCart())}>clear cart</button>
                {!store.selectedItems.length && <Navigate to='/products' />}
            </ul>
        </div>
    );
};

export default CartItemsSidebar;