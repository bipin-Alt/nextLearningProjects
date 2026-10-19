import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showPassword: false,
}
const showPassSlice = createSlice({
  name: "pass",
  initialState,
  reducers: {
    togglePasswordShow: (state) => {
      state.showPassword = !state.showPassword
    },
  },
})
export const { togglePasswordShow } = showPassSlice.actions;
export default showPassSlice.reducer;
