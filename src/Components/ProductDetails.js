import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import style from '../app.module.css';
import { Link } from 'react-router-dom';

function ProductDetails() {
    const productId = useParams();
    const productIndex = productId.id - 1;
    const product = useSelector(state => state.products.products[productIndex]);
    const {image,title,description,price,category}=product

    return (
        <ul className={style.product_details}>
            <div>
                <li><img width='100%' src={image} alt='product'/></li><br/>
                <li><h2>{title}</h2></li>
                <li><p>{description}</p></li><br/>
                <li><h4><span>price: </span>${price}</h4></li>
                <li><h4><span>category: </span>{category}</h4></li><br/><br/>
                <li><Link to={`/products`}>back to shop</Link></li>
            </div>
        </ul>
    );
}

export default ProductDetails;