import style from '../app.module.css';
import { shorten ,isInCard,qtyCount} from '../helper';
import { increaseItem,decreaseItem,removeItem } from '../Redux/Cart/cartAction';
import { Link } from 'react-router-dom';
import increase from '../images/product_actions_icons/plus_square_.svg'
import decrease from '../images/product_actions_icons/minus_square_.svg'
import remove from '../images/product_actions_icons/trash.svg'
const Item = ({item,dispatch,selectedItems}) => {
    return (
        <div>
             <ul className={style.itemList}>
                <li><img width='100%' src={item.image} alt='product'/></li>
                <div style={{display:'flex',flexWrap:'nowrap',gap:'14px'}}>
                <li><span>{shorten(item.title)}</span></li>
                <li><span>{`$${item.price}`}</span></li>
                <li><span>{item.category}</span></li>
                <li><span>{item.qty}</span></li>
                </div>
                <li>
                    <ul>
                        <li>{isInCard(item,selectedItems) && <button className={`${style.fade_in} ${style.border_topbottom_right}`} onClick={() => dispatch(increaseItem(item))}><img src={increase} alt='productActions'/></button>}</li>
                        <li>{qtyCount(item,selectedItems)===1 && <button className={`${style.fade_in} ${style.border_topbottom_left}`} onClick={() => dispatch(removeItem(item))}><img src={remove} alt='productActions'/></button>}</li>
                        <li>{qtyCount(item,selectedItems)>1 && <button className={`${style.fade_in} ${style.border_topbottom_left}`} onClick={() => dispatch(decreaseItem(item))}><img src={decrease} alt='productActions'/></button>}</li>
                    </ul>
                </li>
                <li><Link to={`/products/${item.id}`}>details</Link></li>
            </ul>
        </div>
    );
};

export default Item;