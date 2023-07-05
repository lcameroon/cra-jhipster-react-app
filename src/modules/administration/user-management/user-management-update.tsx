import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getUser, getRoles, updateUser, createUser, reset } from './user-management.reducer';

export const UserManagementUpdate = (props: RouteComponentProps<{ login: string }>) => {
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
  const authorities = useAppSelector((state) => state.userManagement.authorities);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h1>Create or edit a User</h1>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm onSubmit={saveUser} defaultValues={user}>
              {user.id ? <ValidatedField type="text" name="id" required readOnly label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                type="text"
                name="login"
                label="Login"
                validate={{
                  required: {
                    value: true,
                    message: 'validate.login.required',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$/,
                    message: 'validate.login.pattern',
                  },
                  minLength: {
                    value: 1,
                    message: 'validate.login.minlength',
                  },
                  maxLength: {
                    value: 50,
                    message: 'validate.login.maxlength',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="firstName"
                label="First Name"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'validation.maxlength 50',
                  },
                }}
              />
              <ValidatedField
                type="text"
                name="lastName"
                label="Last Name"
                validate={{
                  maxLength: {
                    value: 50,
                    message: 'validation.maxlength 50',
                  },
                }}
              />
              <FormText>This field cannot be longer than 50 characters.</FormText>
              <ValidatedField
                name="email"
                label="E-mail"
                type="email"
                validate={{
                  required: {
                    value: true,
                    message: 'validate.email.required',
                  },
                  minLength: {
                    value: 5,
                    message: 'validate.email.minlength',
                  },
                  maxLength: {
                    value: 254,
                    message: 'validate.email.maxlength',
                  },
                  validate: (v) => isEmail(v) || 'validate.email.invalid',
                }}
              />
              <ValidatedField type="checkbox" name="activated" check value={true} disabled={!user.id} label="Activated" />
              <ValidatedField name="langKey" label="langKey" readOnly />
              <ValidatedField type="select" name="authorities" multiple label="Profiles">
                {authorities.map((role) => (
                  <option value={role} key={role}>
                    {role}
                  </option>
                ))}
              </ValidatedField>
              <Button tag={Link} to="/admin/user-management" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" type="submit" disabled={isInvalid || updating}>
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

export default UserManagementUpdate;
