import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from '../app.module.css';
import { shorten, isInCard, qtyCount } from '../helper';
import { addItem, decreaseItem, increaseItem, removeItem } from '../Redux/Cart/cartAction';
import increase from '../images/product_actions_icons/plus_square_.svg'
import decrease from '../images/product_actions_icons/minus_square_.svg'
import remove from '../images/product_actions_icons/trash.svg'
const Product = ({ product }) => {
    const dispatch = useDispatch();
    const selectedItems = useSelector(state => state.cart.selectedItems);
    return (
        <li>
            <ul className={style.productItem}>
                <li><img src={product.image} alt='product'/></li>
                <li><span>{shorten(product.title)}</span></li>
                <li><span>{`price: $${product.price}`}</span></li>
                <li><span>{`category : ${product.category}`}</span></li>
                <li>
                    <ul>
                        <li>{!isInCard(product, selectedItems) && <button className={`${style.fade_in}`} onClick={() => dispatch(addItem(product))}>ADD</button>}</li>
                        <li>{isInCard(product, selectedItems) && <button className={`${style.fade_in} ${style.border_topbottom_right}`} onClick={() => dispatch(increaseItem(product))}><img src={increase} alt='productActions'/></button>}</li>
                        <li>{qtyCount(product, selectedItems) === 1 && <button className={`${style.fade_in} ${style.border_topbottom_left}`} onClick={() => dispatch(removeItem(product))}><img src={remove} alt='productActions'/></button>}</li>
                        <li>{qtyCount(product, selectedItems) > 1 && <button className={`${style.fade_in} ${style.border_topbottom_left}`} onClick={() => dispatch(decreaseItem(product))}><img src={decrease} alt='productActions'/></button>}</li>
                    </ul>
                </li>
                <li>
                    {
                      
                        <span className={!isInCard(product, selectedItems) ? style.product_hover_effect : style.show_quantity_slide}>
                            {isInCard(product, selectedItems) && <i>{qtyCount(product, selectedItems)}</i>}
                        </span>
                    }
                </li>
                <li><Link className={style.details_svg} to={`/products/${product.id}`}>details</Link></li>
            </ul>
        </li>
    );
};

export default Product;