import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userLogin } from '../../services/apiGiftCert';

const initialState = {
  userName: '',
  jwtToken: '',
  userLogin: '',
  status: '',
};

export const makeLogin = createAsyncThunk(
  'user/doLogin',
  async function ({ reqData, navigateTo }) {
    const loginRes = await userLogin(reqData);
    navigateTo();
    return loginRes;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.userName = action.payLoad;
    },
    logout(state, action) {
      state.userName = '';
      state.jwtToken = '';
    },
  },
  extraReducers: (builder) =>
    builder
      // eslint-disable-next-line no-unused-vars
      .addCase(makeLogin.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(makeLogin.fulfilled, (state, action) => {
        state.jwtToken = action.payload.accessToken;
        state.userName = action.payload.fullName;
        state.userLogin = action.payload.userLogin;
        state.status = 'idle';
      })
      // eslint-disable-next-line no-unused-vars
      .addCase(makeLogin.rejected, (state, action) => {
        state.status = 'error';
        state.error = 'There is a problem with login';
      }),
});

export const { updateName, logout } = userSlice.actions;

export default userSlice.reducer;
