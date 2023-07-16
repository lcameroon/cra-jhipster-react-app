import { IonButton, IonCard } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';
import { CommonPage, Loading, ValidatedField, ValidatedForm, isEmail } from '../../../shared/components';
import { AUTHORITIES } from '../../../config/constants';

export const UserManagementUpdate: React.FC<RouteComponentProps<{ login: string }>> = (props) => {
  const [isNew] = useState(!props.match.params || !props.match.params.login);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getUser(props.match.params.login));
    }
    dispatch(getRoles());
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isNew, props.match.params.login]);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = (values) => {
    if (isNew) {
      dispatch(createUser(values));
    } else {
      dispatch(updateUser(values));
    }
    handleClose();
  };

  const isInvalid = false;
  const user = useAppSelector((state) => state.userManagement.user);
  const loading = useAppSelector((state) => state.userManagement.loading);
  const updating = useAppSelector((state) => state.userManagement.updating);
  const authorities = Object.values(AUTHORITIES).map((role) => ({ id: role, label: role }));

  return (
    <CommonPage title={`${isNew ? 'Create' : 'Edit'} User`}>
      <div className="ion-content-max-width">
        <h6 className="ion-no-margin ion-padding opacity-50 w-50">User Details</h6>
        <div className="ion-card ion-padding">
          {(loading || updating) && <Loading />}
          {!loading && (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? (
                <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                type="text"
                name="firstName"
                label="First Name"
                validate={{
                  required: { value: true, message: 'This field is required' },
                  minLength: { value: 3, message: 'Must contain at least three letters' },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Last Name"
                validate={{
                  required: { value: true, message: 'This field is required' },
                  minLength: { value: 3, message: 'Must contain at least three letters' },
                }}
              />
              <ValidatedField
                name="email"
                label="E-mail"
                type="email"
                validate={{
                  required: { value: true, message: 'This field is required' },
                  minLength: { value: 8, message: 'Must contain at least 8 letters' },
                  validate: (v) => isEmail(v) || 'Invalid e-mail address',
                }}
              />
              <ValidatedField name="activated" check value={true} disabled={!user.id} label="Activated" />
              <ValidatedField name="langKey" label="langKey" readOnly />
              <ValidatedField options={authorities} name="authorities" label="Roles" />
              <br />
              <IonButton fill="outline" shape="round" onClick={() => props.history.push('/admin/user-management')}>
                Back
              </IonButton>
              &nbsp;
              <IonButton color="primary" shape="round" type="submit" disabled={isInvalid || updating}>
                Save
              </IonButton>
            </ValidatedForm>
          )}
        </div>
      </div>
    </CommonPage>
  );
};

export default UserManagementUpdate;
