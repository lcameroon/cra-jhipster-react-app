import { IonAlert, IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { APP_DATE_FORMAT } from '../../../config/constants';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { CommonPage, TextFormat } from '../../../shared/components';
import { deleteUser, getUser } from './user-management.reducer';

export const UserManagementDetail: React.FC<RouteComponentProps<{ login: string }>> = ({ match, history }) => {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getUser(match.params.login));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = useAppSelector((state) => state.userManagement.user);

  const handleEdit = () => history.push(`/admin/user-management/${user.id}/edit`);

  const handleBack = () => history.push('/admin/user-management');

  const handleRemove = () => setShowAlert(true);

  const confirmRemove = () => {
    dispatch(deleteUser(`${user.id}`));
    setShowAlert(false);
    handleBack();
  };

  return (
    <CommonPage title="User Details">
      <div className="ion-content-max-width">
        <div className="ion-card">
          <IonList className="ion-no-padding">
            <IonItem lines="none">
              <IonLabel>
                <strong>ID</strong>
              </IonLabel>
              <IonLabel>{user?.id}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <strong>First Name</strong>
              </IonLabel>
              <IonLabel>{user.firstName}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <strong>Last Name</strong>
              </IonLabel>
              <IonLabel>{user.lastName}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <strong>E-mail</strong>
              </IonLabel>
              <IonLabel>{user.email}</IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <strong>Role</strong>
              </IonLabel>
              <IonLabel>{user.authorities}</IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>
                <strong>Updated At</strong>
              </IonLabel>
              <IonLabel>
                {user.updatedAt ? (
                  <TextFormat value={user.updatedAt} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </IonLabel>
            </IonItem>
          </IonList>
          <div className="ion-padding ion-text-end">
            <IonButton onClick={handleBack} fill="outline" shape="round" className="ion-float-start">
              Back
            </IonButton>

            <IonButton onClick={handleRemove} fill="outline" shape="round" color="danger">
              Delete
            </IonButton>
            <IonButton onClick={handleEdit} shape="round" color="primary">
              Edit
            </IonButton>
          </div>
        </div>
      </div>
      <IonAlert
        isOpen={showAlert}
        header="Confirm!"
        message="Are you sure you want to delete?"
        backdropDismiss={false}
        buttons={[
          {
            text: 'Cancel',
            handler: () => setShowAlert(false),
          },
          {
            text: 'OK',
            handler: confirmRemove,
          },
        ]}
      />
    </CommonPage>
  );
};

export default UserManagementDetail;
