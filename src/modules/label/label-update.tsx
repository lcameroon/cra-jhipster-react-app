import { IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { getEntity, updateEntity, createEntity, reset } from './label.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';
import { CommonPage, Loading, ValidatedField, ValidatedForm } from '../../shared/components';

export const LabelUpdate: React.FC<RouteComponentProps<{ id: string }>> = ({ match, history }) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!match.params || !match.params.id);

  const labelEntity = useAppSelector((state) => state.label.entity);
  const loading = useAppSelector((state) => state.label.loading);
  const updating = useAppSelector((state) => state.label.updating);
  const updateSuccess = useAppSelector((state) => state.label.updateSuccess);

  const handleClose = () => history.push('/label');

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(match.params.id));
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]); // eslint-disable-line

  const saveEntity = (values) => {
    const entity = {
      ...labelEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () => (isNew ? {} : { ...labelEntity });

  return (
    <CommonPage title={`${isNew ? 'Create' : 'Edit'} Label`}>
      <div className="ion-content-max-width">
        <div className="ion-card ion-padding">
          {loading ? (
            <Loading />
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField disabled={loading} name="id" readOnly label="ID" /> : null}
              <ValidatedField
                label="Label"
                id="label-label"
                name="label"
                type="text"
                disabled={loading}
                validate={{
                  required: { value: true, message: 'entity.validation.required' },
                  minLength: { value: 3, message: 'entity.validation.minlength' },
                }}
              />
              <IonButton onClick={() => history.push('/label')} fill="outline">
                Back
              </IonButton>
              &nbsp;
              <IonButton color="primary" type="submit" disabled={updating}>
                Save
              </IonButton>
            </ValidatedForm>
          )}
        </div>
      </div>
    </CommonPage>
  );
};

export default LabelUpdate;
