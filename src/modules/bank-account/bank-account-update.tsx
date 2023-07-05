import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getUsers } from '../administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bank-account.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';

export const BankAccountUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const users = useAppSelector((state) => state.userManagement.users);
  const bankAccountEntity = useAppSelector((state) => state.bankAccount.entity);
  const loading = useAppSelector((state) => state.bankAccount.loading);
  const updating = useAppSelector((state) => state.bankAccount.updating);
  const updateSuccess = useAppSelector((state) => state.bankAccount.updateSuccess);

  const handleClose = () => {
    props.history.push('/bank-account');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getUsers({}));
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
      ...bankAccountEntity,
      ...values,
      user: users.find((it) => it.id.toString() === values.userId.toString()),
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
          ...bankAccountEntity,
          userId: bankAccountEntity?.user?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterSampleApplicationReactApp.bankAccount.home.createOrEditLabel" data-cy="BankAccountCreateUpdateHeading">
            Create or edit a BankAccount
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="bank-account-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Account Name"
                id="bank-account-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'entity.validation.required' },
                }}
              />
              <ValidatedField
                label="Balance"
                id="bank-account-balance"
                name="balance"
                data-cy="balance"
                type="text"
                validate={{
                  required: { value: true, message: 'entity.validation.required' },
                  validate: (v) => isNumber(v) || 'entity.validation.number',
                }}
              />
              <ValidatedField id="bank-account-user" name="userId" data-cy="user" label="user" type="select">
                <option value="" key="0" />
                {users
                  ? users.map((otherEntity) => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/bank-account" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BankAccountUpdate;
