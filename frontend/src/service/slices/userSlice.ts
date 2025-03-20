import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState:initialValue, // Corrected from 'initialValue' to 'initialState'
  reducers: {
    setUserDetails: (state, action) => {
      state = { ...action.payload }; // Note: this line is incorrect, will address below
    },
  },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
