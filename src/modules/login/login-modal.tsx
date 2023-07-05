import React from 'react';
import { ValidatedField } from 'react-jhipster';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Row, Col, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: (email: string, password: string, rememberMe: boolean) => void;
  handleClose: () => void;
}

const LoginModal = (props: ILoginModalProps) => {
  const login = ({ email, password, rememberMe }) => {
    props.handleLogin(email, password, rememberMe);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({ mode: 'onTouched' });

  const { loginError, handleClose } = props;

  return (
    <Modal isOpen={props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
      <Form onSubmit={handleSubmit(login)}>
        <ModalHeader id="login-title" data-cy="loginTitle" toggle={handleClose}>
          Sign in
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col md="12">
              {loginError ? (
                <Alert color="danger" data-cy="loginError">
                  <strong>Failed to sign in!</strong> Please check your credentials and try again.
                </Alert>
              ) : null}
            </Col>
            <Col md="12">
              <ValidatedField
                name="email"
                label="E-mail"
                required
                autoFocus
                data-cy="email"
                validate={{ required: 'email cannot be empty!' }}
                register={register}
                error={errors.email}
                isTouched={touchedFields.email}
              />
              <ValidatedField
                name="password"
                type="password"
                label="Password"
                required
                data-cy="password"
                validate={{ required: 'Password cannot be empty!' }}
                register={register}
                error={errors.password}
                isTouched={touchedFields.password}
              />
              <ValidatedField name="rememberMe" type="checkbox" check label="Remember" value={true} register={register} />
            </Col>
          </Row>
          <div className="mt-1">&nbsp;</div>
          <Alert color="warning">
            <Link to="/account/reset/request" data-cy="forgetYourPasswordSelector">
              Did you forget your password?
            </Link>
          </Alert>
          <Alert color="warning">
            <span>You don&apos;t have an account yet?</span> <Link to="/account/register">Register a new account</Link>
          </Alert>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleClose} tabIndex={1}>
            Cancel
          </Button>{' '}
          <Button color="primary" type="submit" data-cy="submit">
            Sign in
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default LoginModal;
