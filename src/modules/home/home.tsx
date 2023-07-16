import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { useAppSelector } from '../../config/store';
import { config } from '../../config/constants';
import { CommonPage } from '../../shared/components';
import { IonButton, IonChip } from '@ionic/react';

export const Home: React.FC = () => {
  const account = useAppSelector((state) => state.auth.account);

  console.log({ account });

  return (
    <CommonPage title="Welcome">
      <div className="ion-content-max-width">
        <div className="ion-padding ion-card ion-text-center">
          <span className="hipster rounded" style={{ backgroundImage: 'url(/images/jhipster_family_member_1.svg)' }} />
          <h2>Welcome, {config.APP_NAME}!</h2>
          <p className="lead">This is your homepage</p>
          {account.email ? (
            <div>
              <IonChip color="success">You are logged in as user {account.email}.</IonChip>
            </div>
          ) : (
            <div>
              <IonButton href="/login" shape="round">
                SIGN IN
              </IonButton>
              <p>If you want to sign-in, you can try the default accounts:</p>
              <ul className="ion-text-start">
                <li>
                  <strong>Administrator:</strong>{' '}
                  <code>login=&quot;admin@tr.com&quot; and password=&quot;admin@tr&quot;</code>
                </li>
                <li>
                  <strong>User:</strong> <code>login=&quot;user@tr.com&quot; and password=&quot;user@tr&quot;</code>.
                </li>
              </ul>
              <p>
                You do not have an account yet?{' '}
                <Link to="/account/register" className="alert-link">
                  Register a new account
                </Link>
              </p>
            </div>
          )}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis molestias rerum praesentium quia quae
            quisquam aspernatur aut sunt, ex rem, temporibus perspiciatis, sapiente doloribus fugiat expedita illum
            ipsam nihil voluptatibus.
          </p>
        </div>
      </div>
    </CommonPage>
  );
};

export default Home;
