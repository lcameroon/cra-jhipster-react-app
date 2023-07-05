import React, { useState, useEffect } from 'react';
import { ValidatedField, ValidatedForm } from 'react-jhipster';
import { Row, Col, Button } from 'reactstrap';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getSession } from '../../../shared/reducers/authentication';
import PasswordStrengthBar from '../../../shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';

export const PasswordPage = () => {
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
    dispatch(getSession());
    return () => {
      dispatch(reset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleValidSubmit: any = ({ currentPassword, newPassword }) => {
    dispatch(savePassword({ currentPassword, newPassword }));
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const account = useAppSelector((state) => state.authentication.account);
  const successMessage = useAppSelector((state) => state.password.successMessage);
  const errorMessage = useAppSelector((state) => state.password.errorMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    } else if (errorMessage) {
      toast.success(errorMessage);
    }
  }, [successMessage, errorMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="password-title">
            <span>Password for {account.login}</span>
          </h2>
          <ValidatedForm id="password-form" onSubmit={handleValidSubmit}>
            <ValidatedField
              name="currentPassword"
              label="Current Password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.newpassword.required' },
              }}
              data-cy="currentPassword"
            />
            <ValidatedField
              name="newPassword"
              label="New Password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.newpassword.required' },
                minLength: { value: 4, message: 'validate.newpassword.minlength' },
                maxLength: { value: 50, message: 'validate.newpassword.maxlength' },
              }}
              onChange={updatePassword}
              data-cy="newPassword"
            />
            <PasswordStrengthBar password={password} />
            <ValidatedField
              name="confirmPassword"
              label="Confirm password"
              type="password"
              validate={{
                required: { value: true, message: 'validate.confirmpassword.required' },
                minLength: { value: 4, message: 'validate.confirmpassword.minlength' },
                maxLength: { value: 50, message: 'validate.confirmpassword.maxlength' },
                validate: (v) => v === password || 'error.dontmatch',
              }}
              data-cy="confirmPassword"
            />
            <Button color="success" type="submit" data-cy="submit">
              Save
            </Button>
          </ValidatedForm>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordPage;
