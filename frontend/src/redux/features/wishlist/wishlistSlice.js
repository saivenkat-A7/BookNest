import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    toggleWishlistItem: (state, action) => {
      const itemIndex = state.findIndex(book => book._id === action.payload._id);
      if (itemIndex > -1) {
        state.splice(itemIndex, 1); // remove if exists
      } else {
        state.push(action.payload); // add if not exists
      }
    },
    clearWishlist: () => [],
  },
});

export const { toggleWishlistItem, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
