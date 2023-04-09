import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface loadingState {
  value: boolean;
}

const initialState: loadingState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    loading: (state) => {
      state.value = !state.value;
    },
  },
});
export const { loading } = loadingSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default loadingSlice.reducer;
