import { combineReducers } from 'redux';

import { UserManagementSlice, UserManagementState } from './user-management/user-management.reducer';

export interface AdministrationState {
  readonly userManagement: UserManagementState;
}

const AdministrationReducer = combineReducers<AdministrationState>({
  userManagement: UserManagementSlice.reducer,
});

// Reducer
export default AdministrationReducer;
