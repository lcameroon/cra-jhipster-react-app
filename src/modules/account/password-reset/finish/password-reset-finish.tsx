import React, { useState, useEffect } from 'react';
import { Col, Row, Button } from 'reactstrap';
import { getUrlParameter, ValidatedField, ValidatedForm } from 'react-jhipster';
import { RouteComponentProps } from 'react-router-dom';
import { toast } from 'react-toastify';

import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from '../../../../shared/layout/password/password-strength-bar';
import { useAppDispatch, useAppSelector } from '../../../../config/store';

export const PasswordResetFinishPage = (props: RouteComponentProps<{ key: string }>) => {
  const [password, setPassword] = useState('');
  const [key] = useState(getUrlParameter('key', props.location.search));
  const dispatch = useAppDispatch();

  useEffect(
    () => () => {
      dispatch(reset());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleValidSubmit: any = ({ newPassword }) => {
    dispatch(handlePasswordResetFinish({ key, newPassword }));
  };

  const updatePassword = (event) => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <ValidatedForm onSubmit={handleValidSubmit}>
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
          data-cy="resetPassword"
        />
        <PasswordStrengthBar password={password} />
        <ValidatedField
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          validate={{
            required: { value: true, message: 'validate.confirmpassword.required' },
            minLength: { value: 4, message: 'validate.confirmpassword.minlength' },
            maxLength: { value: 50, message: 'validate.confirmpassword.maxlength' },
            validate: (v) => v === password || 'error.dontmatch',
          }}
          data-cy="confirmResetPassword"
        />
        <Button color="success" type="submit" data-cy="submit">
          Validate new password
        </Button>
      </ValidatedForm>
    );
  };

  const successMessage = useAppSelector((state) => state.passwordReset.successMessage);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
    }
  }, [successMessage]);

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="4">
          <h1>Reset password</h1>
          <div>{key ? getResetForm() : null}</div>
        </Col>
      </Row>
    </div>
  );
};

export default PasswordResetFinishPage;
