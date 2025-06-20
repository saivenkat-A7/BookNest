import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);

            if (!existingItem) {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added to the Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                existingItem.quantity += 1;
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Quantity Increased",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        },



        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id)
        },
        clearCart: (state) => {
            state.cartItems = []
        }
    }
})

// export the actions   
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;