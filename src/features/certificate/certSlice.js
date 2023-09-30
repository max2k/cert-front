import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCertApi } from '../../services/apiGiftCert';
import { setError } from '../error/errorSlice';

export const deleteCert = createAsyncThunk(
  'cert/delete',
  async function ({ certId, jwt }, thunkAPI) {
    try {
      await deleteCertApi(certId, jwt);
      return certId;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError('Deleting failed with message:' + error.message),
      );
      throw Error('Deleting certificate failed');
    }
    return { message: 'Certificate with id ' + certId + 'deleted' };
  },
);

const initialState = {
  isDeleting: false,
  deletedIds: [],
  operationErrorMessage: '',
};

const certSlice = createSlice({
  name: 'cert',
  initialState,
  reducers: {
    clearDeletedIds(state, action) {
      state.deletedIds = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteCert.fulfilled, (state, action) => {
        state.isDeleting = false;
        state.deletedIds = [...state.deletedIds, action.payload];
        state.operationErrorMessage = '';
      })
      .addCase(deleteCert.pending, (state, action) => {
        state.isDeleting = true;
      })
      .addCase(deleteCert.rejected, (state, action) => {
        state.isDeleting = false;
        state.operationErrorMessage =
          'Deletion operation failed ' + action.error.message;
      });
  },
});

export const { clearDeletedIds } = certSlice.actions;

export default certSlice.reducer;
