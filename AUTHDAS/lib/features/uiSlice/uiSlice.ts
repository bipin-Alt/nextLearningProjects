import { createSlice } from "@reduxjs/toolkit";
interface  CounterState {
  showPassword : boolean,
  isEditing: boolean
}
const initialState : CounterState = {
  showPassword: false,
  isEditing: false,
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

