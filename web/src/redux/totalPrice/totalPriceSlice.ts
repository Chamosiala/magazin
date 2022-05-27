// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../../pages/_app";

// interface TotalPriceState {
//   value: number;
// }

// const initialState: TotalPriceState = {
//   value: 0,
// } as TotalPriceState;

// export const totalPriceSlice = createSlice({
//   name: "totalPrice",
//   initialState,
//   reducers: {
//     increaseByAmount: (state, action: PayloadAction<number>) => {
//       state.value += action.payload;
//     },
//   },
// });

// export const { increaseByAmount } = totalPriceSlice.actions;

// export const selectPrice = (state: RootState) => state.totalPrice.value;

// export default totalPriceSlice.reducer;
