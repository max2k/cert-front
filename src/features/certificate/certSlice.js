import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCertApi } from '../../services/apiGiftCert';
import { setError } from '../error/errorSlice';

export const deleteCert = createAsyncThunk(
  'cert/delete',
  async function ({ certId, jwt, onFinal }, thunkAPI) {
    try {
      const result = await deleteCertApi(certId, jwt);
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError('Deleting failed with message:' + error.message),
      );
      throw Error('Deleting certificate failed');
    } finally {
      onFinal();
    }
    return { message: 'Certificate with id ' + certId + 'deleted', onFinal };
  },
);

const initialState = {
  isDeleting: false,
  operationErrorMessage: '',
};

const certSlice = createSlice({
  name: 'cert',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCert.fulfilled, (state, action) => {
        state.isDeleting = false;
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

export default certSlice.reducer;
