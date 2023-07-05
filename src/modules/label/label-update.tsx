import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ValidatedField, ValidatedForm } from 'react-jhipster';

import { getEntity, updateEntity, createEntity, reset } from './label.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';

export const LabelUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const labelEntity = useAppSelector((state) => state.label.entity);
  const loading = useAppSelector((state) => state.label.loading);
  const updating = useAppSelector((state) => state.label.updating);
  const updateSuccess = useAppSelector((state) => state.label.updateSuccess);

  const handleClose = () => {
    props.history.push('/label');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

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

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...labelEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationReactApp.label.home.createOrEditLabel" data-cy="LabelCreateUpdateHeading">
            Create or edit a Label
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="label-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Label"
                id="label-label"
                name="label"
                data-cy="label"
                type="text"
                validate={{
                  required: { value: true, message: 'entity.validation.required' },
                  minLength: { value: 3, message: 'entity.validation.minlength' },
                }}
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/label" replace color="info">
                Back
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default LabelUpdate;
