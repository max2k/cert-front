import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCertApi, updateCertApi } from '../../services/apiGiftCert';
import { setError } from '../error/errorSlice';

export const deleteCert = createAsyncThunk(
  'cert/delete',
  async function ({ certId }, thunkAPI) {
    try {
      const jwt = thunkAPI.getState().user.jwtToken;
      await deleteCertApi(certId, jwt);
      return certId;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError('Deleting failed with message:' + error.message),
      );
      throw Error('Deleting certificate failed');
    }
  },
);

export const updateCert = createAsyncThunk(
  'cert/update',
  async function ({ certId, fields }, thunkAPI) {
    try {
      const jwt = thunkAPI.getState().user.jwtToken;
      await updateCertApi(certId, fields, jwt);
      return certId;
    } catch (error) {
      console.log(error);
      thunkAPI.dispatch(
        setError('Deleting failed with message:' + error.message),
      );
      throw Error('Deleting certificate failed');
    }
  },
);

const initialState = {
  isDeleting: false,
  isUpdating: false,
  updateKey: 1,
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
    incUpdateKey(state, action) {
      state.updateKey += 1;
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
      })
      .addCase(updateCert.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.operationErrorMessage = '';
        state.updateKey += 1;
      })
      .addCase(updateCert.pending, (state, action) => {
        state.isUpdating = true;
      })
      .addCase(updateCert.rejected, (state, action) => {
        state.isUpdating = false;
        state.operationErrorMessage =
          'Updating failed with message: ' + action.error.message;
      });
  },
});

export const { clearDeletedIds, incUpdateKey } = certSlice.actions;

export default certSlice.reducer;
