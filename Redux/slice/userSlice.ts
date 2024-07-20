import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface UserState {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
}

// Define the initial state using that type
const initialState: UserState = {
  _id: '',
  username: '',
  email: '',
  createdAt: '',
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
    },
    logout: (state) => {
      state._id = '';
      state.username = '';
      state.email = '';
      state.createdAt = '';
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
