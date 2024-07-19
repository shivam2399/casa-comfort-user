import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    selectedAddress: null,
  },
  reducers: {
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    selectAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const { addAddress, selectAddress } = addressSlice.actions;
export default addressSlice.reducer;
