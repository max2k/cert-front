import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createCertApi,
  deleteCertApi,
  updateCertApi,
} from '../../services/apiGiftCert';
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
      if (fields.tags)
        fields.tags = fields.tags.map((item) => item.text).join(',');
      await updateCertApi(certId, fields, jwt);
      return certId;
    } catch (error) {
      thunkAPI.dispatch(
        setError(
          `Deleting failed with code ${error.code} message: ${error.message}`,
        ),
      );
      throw Error('Deleting certificate failed');
    }
  },
);

export const createCert = createAsyncThunk(
  'cert/create',
  async function (fields, thunkAPI) {
    try {
      if (fields.tags)
        fields.tags = fields.tags.map((item) => ({ id: -1, name: item.text }));
      console.log(fields);
      const jwt = thunkAPI.getState().user.jwtToken;
      await createCertApi(JSON.stringify(fields), jwt);
    } catch (error) {
      thunkAPI.dispatch(
        setError(
          `Creating failed with code ${error.code} message: ${error.message}`,
        ),
      );
      throw Error('Create certificate failed');
    }
  },
);

const initialState = {
  isDeleting: false,
  isUpdating: false,
  isCreating: false,
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
      })
      .addCase(updateCert.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.operationErrorMessage = '';
      })
      .addCase(updateCert.pending, (state, action) => {
        state.isUpdating = true;
      })
      .addCase(updateCert.rejected, (state, action) => {
        state.isUpdating = false;
        state.operationErrorMessage =
          'Updating failed with message: ' + action.error.message;
      })
      .addCase(createCert.fulfilled, (state, action) => {
        state.isCreating = false;
        state.operationErrorMessage = '';
      })
      .addCase(createCert.pending, (state, action) => {
        state.isCreating = true;
      })
      .addCase(createCert.rejected, (state, action) => {
        state.isCreating = false;
        state.operationErrorMessage =
          'Updating failed with message: ' + action.error.message;
      });
  },
});

export default certSlice.reducer;
