import { productReducer } from "../Products/productReducer";
import { cartReducer } from '../Cart/cartReducer';
import { combineReducers } from "redux";
const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
})

export { rootReducer }