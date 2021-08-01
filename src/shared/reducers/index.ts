import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
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
// prettier-ignore
import operation from '../../modules/operation/operation.reducer';
/* add reducer here */

const rootReducer = {
  authentication,
  locale,
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
  operation,
  /* add reducer here */
  loadingBar,
};

export default rootReducer;
