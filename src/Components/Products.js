import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, timeUpdate } from '../Redux/Products/productAction';
import Product from './Product';
import Sidebar from './Sidebar';
import style from '../app.module.css';
import { timeCalculator } from '../helper';

const Products = () => {
    const [search, updateSearch] = useState('');
    let [formatTime, updateFormatTime] = useState({});
    const store = useSelector(state => state.products);
    let time = useSelector(state => state.products.time);
    const [imgIndex, updateImgIndex] = useState(0);
    const [url, setUrl] = useState([]);
    const dispatch = useDispatch();
    const imgRef = useRef();
    const sliderImageRef = useRef();
    useEffect(() => {

        dispatch(fetchProducts())
        const discountInterval = setInterval(() => {
            time ? time-- : clearInterval(discountInterval)
            dispatch({ type: 'UPDATE_TIME', payload: time })
            updateFormatTime({ ...timeCalculator(time) })
            if (!(timeCalculator(time).secs % 2)) {
                updateImgIndex(img => img > 6 ? 1 : img + 1)
                url.push(imgIndex)
                setUrl([...url])
                if (url.length > 6) {
                    url.length = 0
                }
            }

        }, 1000);
    }, []);

    function createProduct() {

        if (!store.filteredProducts.length && search) {
            return <span style={{ color: 'red', fontWeight: 'bold', fontSize: '24px' }}>item {search} not found....</span>
        }
        return store.filteredProducts && store.filteredProducts.length ?
            store.filteredProducts.map((product, index) => {
                return <Product key={index} product={product} />
            })
            :
            store.products.map((product, index) => {
                return <Product key={index} product={product} />
            })

    }

    function createImageSliderElements() {

        let discountElements = store.products.filter(item => item.category === `women's clothing`);
        return url.length <= 6 &&
            url.map((item, index) => <img ref={sliderImageRef} className={style.slider_img} key={index} src={discountElements[index].image} width='100px' alt='womensclothing' />)


    }
    return (
        <div className={style.slider}>{

            time !== 0 && formatTime.secs &&
            <div className={style.slider_wrapper}>
                <div className={style.top_slider}>
                    <div className={style.slider_text}>
                        <h1>40% discount for women</h1>

                       <div className={style.limited_time}>
                            <span>{formatTime.days}:</span>
                            <span>{formatTime.hours}:</span>
                            <span>{formatTime.mins}:</span>
                            <span>{formatTime.secs}</span>
                        </div>
                    </div>
                    <div className={style.slider_images}>
                        {createImageSliderElements()}
                    </div>
                </div>
            </div>
       }
        
            <ul id={style.container}>
                {
                    !store.loading &&
                    <Sidebar search={search} updateSearch={updateSearch} imgRef={imgRef} store={store} />}
                {
                    store.loading ? <div className={style.lds_circle}><div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: 'white', textShadow: '1px 2px 1px black' }}>loading...</div></div> : createProduct()
                }
            </ul>
        </div>
    );
};

export default Products;