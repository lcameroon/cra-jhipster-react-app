import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';

import { useAppSelector } from '../../config/store';
import { config } from '../../config/constants';

export const Home: React.FC = () => {
  const account = useAppSelector((state) => state.authentication.account);

  return (
    <Row>
      <Col md="3" className="pad">
        <span className="hipster rounded" style={{ backgroundImage: 'url(/images/jhipster_family_member_1.svg)' }} />
      </Col>
      <Col md="9">
        <h2>Welcome, {config.APP_NAME}!</h2>
        <p className="lead">This is your homepage</p>
        {account && account.login ? (
          <div>
            <Alert color="success">You are logged in as user {account.login}.</Alert>
          </div>
        ) : (
          <div>
            <Alert color="warning">
              If you want to
              <Link to="/login" className="alert-link">
                sign in
              </Link>
              , you can try the default accounts:
              <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
              <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
            </Alert>

            <Alert color="warning">
              You do not have an account yet?
              <Link to="/account/register" className="alert-link">
                Register a new account
              </Link>
            </Alert>
          </div>
        )}
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis molestias rerum praesentium quia quae quisquam aspernatur aut
          sunt, ex rem, temporibus perspiciatis, sapiente doloribus fugiat expedita illum ipsam nihil voluptatibus.
        </p>
      </Col>
    </Row>
  );
};

export default Home;
