import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { ValidatedField, ValidatedForm, isEmail } from 'react-jhipster';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getSession } from '../../../shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

export const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector((state) => state.authentication.account);
  const successMessage = useAppSelector((state) => state.settings.successMessage);

  useEffect(() => {
    dispatch(getSession());

    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  const handleValidSubmit = (values) => {
    dispatch(
      saveAccountSettings({
        ...account,
        ...values,
      })
    );
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="settings-title">User settings for {account.email}</h2>
          <ValidatedForm id="settings-form" onSubmit={handleValidSubmit} defaultValues={account}>
            <ValidatedField
              name="firstName"
              label="First name"
              id="firstName"
              validate={{
                required: { value: true, message: 'validate.firstname.required' },
                minLength: { value: 1, message: 'validate.firstname.minlength' },
                maxLength: { value: 50, message: 'validate.firstname.maxlength' },
              }}
              data-cy="firstname"
            />
            <ValidatedField
              name="lastName"
              label="Last name"
              id="lastName"
              validate={{
                required: { value: true, message: 'validate.lastname.required' },
                minLength: { value: 1, message: 'validate.lastname.minlength' },
                maxLength: { value: 50, message: 'validate.lastname.maxlength' },
              }}
              data-cy="lastname"
            />
            <ValidatedField
              name="email"
              label="E-mail"
              type="email"
              validate={{
                required: { value: true, message: 'email.required' },
                minLength: { value: 5, message: 'email.minlength' },
                maxLength: { value: 254, message: 'email.maxlength' },
                validate: (v) => isEmail(v) || 'email.invalid',
              }}
              data-cy="email"
            />
            <ValidatedField id="langKey" name="langKey" label="Language" data-cy="langKey" readOnly />
            <Button color="primary" type="submit" data-cy="submit">
              Save
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;
