import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from '../app.module.css';
import rightArrow from '../images/right_arrow.svg'
import categorySvg from '../images/category.svg'
import { checkCategory, clearFilteredProducts, itemsInSearch } from '../Redux/Products/productAction';
import { Link } from 'react-router-dom';
import { searchByPrice } from '../Redux/Products/productAction';
import { getPricesBetweenMinMax } from '../helper';


function Sidebar({ imgRef, search, updateSearch }) {
    let [sidebarStatus, updateSidebarStatus] = useState(false);
    const [searchBar, updateSearchBar] = useState();
    const searchRef = useRef();
    const dispatch = useDispatch();
    const store = useSelector(state => state.products);
    const { first, range_2, range_3, last } = getPricesBetweenMinMax(store.products)
    const searchBarRef = useRef();
    useEffect(() => {
        imgRef.current.src = sidebarStatus ? rightArrow : categorySvg;
        dispatch(itemsInSearch(search));
        !search && dispatch(searchByPrice(checkSearchBarValue()));
        sidebarStatus && searchRef.current.focus();
    }, [sidebarStatus, search, searchBar]);

    function checkSearchBarValue() {
        updateSearchBar(searchBarRef.current.value)
        let selectedPrice;
        if (searchBar === "0") {
            selectedPrice = 7.95;
        } else if (searchBar === "1") {
            selectedPrice = 30;

        } else if (searchBar === "2") {
            selectedPrice = 57;

        } else if (searchBar === "3") {
            selectedPrice = 999.99;

        }
        return selectedPrice;
    }
    return (
        <div className={`${style.sidebar} ${sidebarStatus ? style.visible : style.invisible}`}>
            <div className={`${style.sidebar_contain} ${sidebarStatus ? style.to_left : style.to_right}`}>
                <div className={style.search_input_container}>
                    <input placeholder='search by name' ref={searchRef} className={style.search_input} type='text' value={search} onChange={(e) => updateSearch(e.target.value)} />
                    {
                        search && <div className={style.search_list}>
                            {
                                store.filteredProducts.length ? store.filteredProducts.map((item, index) =>
                                    <div key={index}>
                                        <img src={item.image} alt='productsList' />
                                        <Link to={`/products/${item.id}`}>
                                            <p>{item.title}</p>
                                        </Link>
                                    </div>
                                )
                                    : <span>not found...</span>
                            }
                        </div>
                    }
                </div>

                {
                    !search &&
                    <ul>
                        <button onClick={() => dispatch(checkCategory(3))}><li>men's clothing</li></button>
                        <button onClick={() => dispatch(clearFilteredProducts())}><li>all products</li></button>
                        <button onClick={() => dispatch(checkCategory(2))}><li>electronics</li></button>
                        <button onClick={() => dispatch(checkCategory(1))}><li>jewelery</li></button>
                        {
                            <div className={style.advanced_search}>
                                <span>advanced seach</span>

                                <div className={style.pricesRange}>
                                    <span>{first && +((first)).toFixed(2)}</span>
                                    <span>{range_2 && +((range_2)).toFixed()}</span>
                                    <input type={'range'} min={0} max={3} onChange={() => checkSearchBarValue()} ref={searchBarRef} />
                                    <span>{range_3 && +((range_3)).toFixed()}</span>
                                    <span>{last && +((last)).toFixed(2)}</span>
                                </div>
                            </div>
                        }
                    </ul>



}
</div>
            <img onClick={() => {updateSidebarStatus(!sidebarStatus)}} ref={imgRef} alt='openclosesidebar' />
        </div>
    );
}

export default Sidebar;