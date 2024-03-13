import { PayloadAction, createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { TypeCommon } from '../../types/common';
import { handleError } from '../../utils/common.utils';
import {
  ICreateUserBody,
  createUser,
  deleteUser,
  listUsers,
  updateUser
} from '../../services/user/user.service';

export type InitialValue = {
  loading: boolean;
  error: object;
  disable?: boolean;
};

const initialState: InitialValue = {
  error: {},
  loading: false,
  disable: false
};

export const userListThunk = createAsyncThunk('user/list', async (_, { rejectWithValue }) => {
  try {
    console.log('run to thunk');
    const response = await listUsers();
    return response?.data;
  } catch (error) {
    return handleError(error as TypeCommon, rejectWithValue);
  }
});

export const createUserThunk = createAsyncThunk(
  'user/create',
  async (body: ICreateUserBody, { rejectWithValue }) => {
    try {
      const response = await createUser(body);
      return response?.data;
    } catch (error) {
      return handleError(error as TypeCommon, rejectWithValue);
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  'user/update',
  async ({ id, body }: { id: string; body: Partial<ICreateUserBody> }, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, body);
      return response?.data;
    } catch (error) {
      return handleError(error as TypeCommon, rejectWithValue);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  'user/update',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id);
      return response?.data;
    } catch (error) {
      return handleError(error as TypeCommon, rejectWithValue);
    }
  }
);

export const userSlice: TypeCommon = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAutoSaveRunning: (state, action: PayloadAction<boolean>) => {
      state.disable = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        userListThunk.fulfilled,
        createUserThunk.fulfilled,
        updateUserThunk.fulfilled,
        deleteUserThunk.fulfilled
      ),
      (state) => {
        return {
          ...state,
          loading: false,
          error: {}
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        userListThunk.rejected,
        createUserThunk.rejected,
        updateUserThunk.rejected,
        deleteUserThunk.rejected
      ),
      (state, action) => {
        return {
          ...state,
          loading: false,
          error: {
            message: action.payload
          }
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        userListThunk.pending,
        createUserThunk.pending,
        updateUserThunk.pending,
        deleteUserThunk.fulfilled
      ),
      (state) => {
        return {
          ...state,
          loading: true
        };
      }
    );
    builder.addMatcher(
      isAnyOf(
        userListThunk.pending,
        createUserThunk.pending,
        updateUserThunk.pending,
        deleteUserThunk.pending
      ),
      (state) => {
        return {
          ...state,
          loading: false
        };
      }
    );
  }
});

export const { setIsAutoSaveRunning } = userSlice.actions;

export default userSlice.reducer;
