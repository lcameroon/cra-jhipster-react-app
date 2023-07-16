import { IonAlert, IonButton, IonItem, IonLabel, IonList } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { deleteEntity, getEntity } from './label.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';
import { CommonPage } from '../../shared/components';

export const LabelDetail: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const dispatch = useAppDispatch();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(getEntity(match.params.id));
  }, []); // eslint-disable-line

  const labelEntity = useAppSelector((state) => state.label.entity);

  const handleEdit = () => history.push(`/label/${labelEntity.id}/edit`);

  const handleBack = () => history.push('/label');

  const handleRemove = () => setShowAlert(true);

  const confirmRemove = () => {
    dispatch(deleteEntity(`${labelEntity.id}`));
    setShowAlert(false);
    handleBack();
  };

  return (
    <CommonPage title="Label Details">
      <div className="ion-content-max-width">
        <div className="ion-card">
          <IonList className="ion-no-padding">
            <IonItem lines="none">
              <IonLabel>
                <strong>ID</strong>
              </IonLabel>
              <IonLabel>{labelEntity.id}</IonLabel>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>
                <strong>Label</strong>
              </IonLabel>
              <IonLabel>{labelEntity.label}</IonLabel>
            </IonItem>
          </IonList>
          <div className="ion-padding ion-text-end">
            <IonButton onClick={handleBack} shape="round" fill="outline" className="ion-float-start">
              Back
            </IonButton>

            <IonButton onClick={handleRemove} shape="round" fill="outline" color="danger">
              Remove
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

export default LabelDetail;
