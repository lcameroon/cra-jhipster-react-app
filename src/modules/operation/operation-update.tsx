import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities as getBankAccounts } from '../bank-account/bank-account.reducer';
import { getEntities as getLabels } from '../label/label.reducer';
import { getEntity, updateEntity, createEntity } from './operation.reducer';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from '../../shared/util/date-utils';
import { mapIdList } from '../../shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from '../../config/store';

export const OperationUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const bankAccounts = useAppSelector((state) => state.bankAccount.entities);
  const labels = useAppSelector((state) => state.label.entities);
  const operationEntity = useAppSelector((state) => state.operation.entity);
  const loading = useAppSelector((state) => state.operation.loading);
  const updating = useAppSelector((state) => state.operation.updating);
  const updateSuccess = useAppSelector((state) => state.operation.updateSuccess);

  const handleClose = () => {
    props.history.push('/operation');
  };

  useEffect(() => {
    if (!isNew) {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getBankAccounts({}));
    dispatch(getLabels({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  const saveEntity = (values) => {
    values.date = convertDateTimeToServer(values.date);

    const entity = {
      ...operationEntity,
      ...values,
      labels: mapIdList(values.labels),
      bankAccount: bankAccounts.find((it: any) => it.id.toString() === values.bankAccountId.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          date: displayDefaultDateTime(),
        }
      : {
          ...operationEntity,
          date: convertDateTimeFromServer(operationEntity.date),
          bankAccountId: operationEntity?.bankAccount?.id,
          labels: operationEntity?.labels?.map((e: any) => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel" data-cy="OperationCreateUpdateHeading">
            <Translate contentKey="jhipsterSampleApplicationReactApp.operation.home.createOrEditLabel">
              Create or edit a Operation
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="operation-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.date')}
                id="operation-date"
                name="date"
                data-cy="date"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.description')}
                id="operation-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.amount')}
                id="operation-amount"
                name="amount"
                data-cy="amount"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  validate: (v) => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                id="operation-bankAccount"
                name="bankAccountId"
                data-cy="bankAccount"
                label={translate('jhipsterSampleApplicationReactApp.operation.bankAccount')}
                type="select"
              >
                <option value="" key="0" />
                {bankAccounts
                  ? bankAccounts.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                label={translate('jhipsterSampleApplicationReactApp.operation.label')}
                id="operation-label"
                data-cy="label"
                type="select"
                multiple
                name="labels"
              >
                <option value="" key="0" />
                {labels
                  ? labels.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.label}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/operation" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OperationUpdate;
