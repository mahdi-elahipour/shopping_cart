const initialState = {
    loading: false,
    products: [],
    filteredProducts: [],
    error: "",
    isProductsPage: true,
    time:35,

}

export const productReducer = (state = initialState, action) => {


    switch (action.type) {
        case "FETCH_PRODUCT_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "FETCH_PRODUCT_SUCCESS":
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case "FETCH_product_FAILURE":
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case "MENS_CLOTHING": {
            const newItems = state.products.filter(item => item.category === `men's clothing`);
            return {
                ...state,
                filteredProducts: [...newItems],
            }
        }
        case "JEWELERY": {
            const newItems = state.products.filter(item => item.category === `jewelery`);
            return {
                ...state,
                filteredProducts: [...newItems],
            }
        }
        case "ELECTRONICS": {
            const newItems = state.products.filter(item => item.category === `electronics`);
            return {
                ...state,
                filteredProducts: [...newItems],
            }
        }
        case "SEARCH_BY_PRICE": {
            const newItems = state.products.filter(item => item.price <= action.payload);
            return {
                ...state,
                filteredProducts: [...newItems],
            }
        }
        case 'CLEAR_FILTERED_PRODUCT': {
            return {
                ...state,
                filteredProducts: [],
            }
        }
        case 'ITEMS_IN_SEARCH': {
            const newItems =state.products.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()))
            return {
                ...state,
                filteredProducts: [...newItems]
            }
        }

        case 'UPDATE_TIME': {
            // localStorage.setItem('limitTime',JSON.stringify(action.payload))
            return {
                ...state,
              time:action.payload
            }
        }
        default: return state;
    }
}