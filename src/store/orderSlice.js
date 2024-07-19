import { createSlice } from '@reduxjs/toolkit';

const initialOrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState: initialOrderState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.push(action.payload);
      
      // Save order to Firebase
      fetch('https://casacomfort-5d739-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify(action.payload),
        headers: { 'Content-Type': 'application/json' }
      });
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
