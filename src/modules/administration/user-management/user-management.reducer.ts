import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';
import axios from 'axios';

import { serializeAxiosError } from '../../../shared/reducers/reducer.utils';
import { IUser, defaultValue } from '../../../shared/model/user.model';

const initialState = {
  loading: false,
  errorMessage: null as undefined | null | string,
  users: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
};

export type UserManagementState = Readonly<typeof initialState>;

const apiUrl = 'api/users';
const adminUrl = 'api/user';

// Async Actions

export const getUsers = createAsyncThunk('userManagement/fetch_users', async () => {
  return axios.get<IUser[]>(apiUrl);
});

export const getRoles = createAsyncThunk('userManagement/fetch_roles', async () => {
  return axios.get<any[]>('api/authorities');
});

export const getUser = createAsyncThunk(
  'userManagement/fetch_user',
  async (id: string) => {
    return axios.get<IUser>(`${apiUrl}/${id}`);
  },
  { serializeError: serializeAxiosError },
);

export const createUser = createAsyncThunk(
  'userManagement/create_user',
  async (user: IUser, { dispatch }) => {
    const result = await axios.post<IUser>(adminUrl, user);
    await dispatch(getUsers());
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const updateUser = createAsyncThunk(
  'userManagement/update_user',
  async (user: IUser, { dispatch }) => {
    const result = await axios.put<IUser>(`${apiUrl}/${user.id}`, user);
    await dispatch(getUsers());
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const deleteUser = createAsyncThunk(
  'userManagement/delete_user',
  async (id: string, { dispatch }) => {
    const result = await axios.delete<IUser>(`${apiUrl}/${id}`);
    await dispatch(getUsers());
    return result;
  },
  { serializeError: serializeAxiosError },
);

export const UserManagementSlice = createSlice({
  name: 'userManagement',
  initialState: initialState as UserManagementState,
  reducers: {
    reset() {
      return initialState;
    },
    resetEntity(state) {
      state.user = defaultValue;
    },
    setEntity(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getRoles.fulfilled, (state, action) => {
        state.authorities = action.payload.data;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.updating = false;
        state.updateSuccess = true;
        state.user = defaultValue;
      })
      .addMatcher(isFulfilled(getUsers), (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalItems = parseInt(action.payload.headers['x-total-count'], 10);
      })
      .addMatcher(isFulfilled(createUser, updateUser), (state, action) => {
        state.updating = false;
        state.loading = false;
        state.updateSuccess = true;
        state.user = action.payload.data;
      })
      .addMatcher(isPending(getUsers, getUser), (state) => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(isPending(createUser, updateUser, deleteUser), (state) => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      })
      .addMatcher(isRejected(getUsers, getUser, getRoles, createUser, updateUser, deleteUser), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset, resetEntity, setEntity } = UserManagementSlice.actions;

// Reducer
export default UserManagementSlice.reducer;
