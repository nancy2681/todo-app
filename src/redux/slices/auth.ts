import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface AuthState {
  user: {
    id: number;
    title: string;
    description: string;
    completed: boolean;
  }[];
}

const initialState: AuthState = {
  user: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      const updateuser = state.user.filter(
        (item) => item.id !== action.payload.id
      );
      state.user = updateuser;
    },
  },
});

export const { addUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
