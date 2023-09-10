import axios from "axios"

const fetchProductRequest = () => {
    return {
        type: "FETCH_PRODUCT_REQUEST"
    }
}

const fetchProductFailure = error => {
    return {
        type: "FETCH_PRODUCT_FAILURE",
        payload: error
    }
}

const fetchProductSuccess = products => {
    return {
        type: "FETCH_PRODUCT_SUCCESS",
        payload: products
    }
}

const checkCategory = (category) => {

    if (category === 1)
        return {
            type: "JEWELERY",
        }
    if (category === 2)
        return {
            type: "ELECTRONICS",
        }
    if (category === 3)
        return {
            type: "MENS_CLOTHING",
        }
}
function clearFilteredProducts() {
    return {
        type: 'CLEAR_FILTERED_PRODUCT',
    }
}
function itemsInSearch(title) {
    return {
        type: "ITEMS_IN_SEARCH",
        payload: title
    }
}
function searchByPrice(price) {
    return {
        type: "SEARCH_BY_PRICE",
        payload: price
    }
}
function timeUpdate(time) {
    return {
        type: "TIME_UPDATE",
        payload: time,
    }
}

const fetchProducts = () => {
    return (dispatch) => {
        dispatch(fetchProductRequest())
        axios.get("https://fakestoreapi.com/products")
            .then(result =>
                dispatch(fetchProductSuccess(result.data)))
            .catch(error =>
                dispatch(fetchProductFailure(error)))
    }
}

export { fetchProducts, checkCategory, clearFilteredProducts, itemsInSearch, searchByPrice,timeUpdate }