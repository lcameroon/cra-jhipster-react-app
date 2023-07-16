import auth from './auth';
import appShared from './app-shared';
/* add reducer here */
import administration from '../../modules/administration/administration.reducer';
import userManagement from '../../modules/administration/user-management/user-management.reducer';
import register from '../../modules/account/register/register.reducer';
import password from '../../modules/account/password/password.reducer';
import settings from '../../modules/account/settings/settings.reducer';
import passwordReset from '../../modules/account/password-reset/password-reset.reducer';
import label from '../../modules/label/label.reducer';

const rootReducer = {
  auth,
  appShared,
  administration,
  userManagement,
  register,
  passwordReset,
  password,
  settings,
  label,
};

export default rootReducer;
