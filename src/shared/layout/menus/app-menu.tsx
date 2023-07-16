import './app-menu.css';

import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonToggle,
} from '@ionic/react';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  hammer,
  moonOutline,
  help,
  logIn,
  personAdd,
  logOutOutline,
  personOutline,
  appsOutline,
  homeOutline,
  pricetagsOutline,
  keypadOutline,
} from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { setDarkMode } from '../../reducers/app-shared';
import { config } from '../../../config/constants';

interface Pages {
  title: string;
  path: string;
  icon: string;
  routerDirection?: string;
}

const routes = {
  appPages: [
    { title: 'Home', path: '/', icon: homeOutline },
    { title: 'Label', path: '/label', icon: pricetagsOutline },
    { title: 'Admin', path: '/admin/user-management', icon: appsOutline },
  ],
  loggedInPages: [
    { title: 'Account', path: '/account/settings', icon: personOutline },
    { title: 'Password', path: '/account/password', icon: keypadOutline },
    { title: 'Logout', path: '/logout', icon: logOutOutline },
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    { title: 'Support', path: '/support', icon: help },
    { title: 'Signup', path: '/signup', icon: personAdd },
  ],
};

export const AppMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation();

  const darkMode = useAppSelector((state) => state.appShared.darkMode);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  function renderlistItems(list: Pages[]) {
    return list
      .filter((route) => !!route.path)
      .map((p) => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem
            detail={false}
            onClick={() => history.push(p.path)}
            className={p.path !== '/' && location.pathname.startsWith(p.path) ? 'selected' : undefined}
          >
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" disabled={!isAuthenticated} contentId="main">
      <IonContent forceOverscroll={false}>
        <img className="ion-margin" src="/images/logo-jhipster.png" alt={config.APP_NAME} />
        <IonList lines="none">
          <IonListHeader>Sections</IonListHeader>
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Account</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
          <IonItem>
            <IonIcon slot="start" icon={moonOutline} aria-hidden="true"></IonIcon>
            <IonToggle checked={darkMode} onClick={() => dispatch(setDarkMode(!darkMode))}>
              Dark Mode
            </IonToggle>
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Tutorial</IonListHeader>
          <IonItem button onClick={() => history.push('/tutorial')}>
            <IonIcon slot="start" icon={hammer} />
            Show Tutorial
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
