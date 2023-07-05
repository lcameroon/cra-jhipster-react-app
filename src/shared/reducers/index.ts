import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication from './authentication';
import applicationProfile from './application-profile';

import administration from '../../modules/administration/administration.reducer';
import userManagement from '../../modules/administration/user-management/user-management.reducer';
import register from '../../modules/account/register/register.reducer';
import activate from '../../modules/account/activate/activate.reducer';
import password from '../../modules/account/password/password.reducer';
import settings from '../../modules/account/settings/settings.reducer';
import passwordReset from '../../modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import bankAccount from '../../modules/bank-account/bank-account.reducer';
// prettier-ignore
import label from '../../modules/label/label.reducer';
/* add reducer here */

const rootReducer = {
  loadingBar,
  /* add reducer here */
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  bankAccount,
  label,
};

export default rootReducer;
