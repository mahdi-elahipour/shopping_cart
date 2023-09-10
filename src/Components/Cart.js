import Item from './Item';
import { useDispatch, useSelector } from 'react-redux';
import style from '../app.module.css'
import CartItemsSidebar from './CartItemsSidebar';
const Cart = () => {

    const dispatch = useDispatch();
    const store = useSelector(state => state);

    function itemsInCart() {
        if (store.cart.selectedItems.length === 0) {
            store.cart.quantity = 0;
            store.cart.totalPrice = 0;
        }
        return store.cart.selectedItems.map((item, index) => {
            return <Item key={index} item={item} selectedItems={store.cart.selectedItems} dispatch={dispatch} />
        })
    }
    return (
        <div className={style.itemWrapper}>
            <CartItemsSidebar store={store} />
            <div className={style.item}>
                {itemsInCart()}
            </div>
        </div>
    );
};
export default Cart;

