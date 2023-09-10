const initialState = {

    selectedItems: [],
    totalPrice: 0,
    quantity: 0,
    checkOut: false

}
function totalPriceAndQty(state) {
    const totalPrice = state.selectedItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2);
    const quantity = state.selectedItems.reduce((acc, item) => acc + item.qty, 0);
    return { totalPrice, quantity }
}
export const cartReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_ITEM":
            {
                if (!state.selectedItems.find(item => item.id === action.payload.id))
                    state.selectedItems.push({ ...action.payload, qty: 1 })

                return {
                    ...state,
                    selectedItems: [...state.selectedItems],
                    ...totalPriceAndQty(state)
                }

            }
        case "REMOVE_ITEM":
            {
                const index = state.selectedItems.findIndex(item => item.id === action.payload.id)
                state.selectedItems[index].qty = 0;
                const newItems = state.selectedItems.filter(item => item.id !== action.payload.id)
                return {
                    ...state,
                    selectedItems: [...newItems],
                    ...totalPriceAndQty(state)
                }

            }
        case "INCREASE_ITEM":
            {

                const index = state.selectedItems.findIndex(item => item.id === action.payload.id);

                state.selectedItems[index].qty++;
                return {
                    ...state,
                    selectedItems: [...state.selectedItems],
                    ...totalPriceAndQty(state)

                }

            }
        case "DECREASE_ITEM":
            {

                const index = state.selectedItems.findIndex(item => item.id === action.payload.id);
                state.selectedItems[index].qty--;
                return {
                    ...state,
                    selectedItems: [...state.selectedItems],
                    ...totalPriceAndQty(state)

                }

            }

        case "CLEAR_CART": {
            return {
                selectedItems: [],
                totalPrice: 0,
                quantity: 0,
                checkOut: false
            }
        }
        default: return state;
    }
}