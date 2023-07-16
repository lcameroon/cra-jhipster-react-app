import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { camelCase } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { ProfileHeaderButton } from './ProfileHeaderButton';
import Footer from '../layout/footer/footer';
import { config } from '../../config/constants';

interface Props {
  children?: any;
  title?: string;
  noPadding?: boolean;
}

export const CommonPage: React.FC<Props> = ({ children, title, noPadding }) => {
  const location = useLocation();

  useEffect(() => {
    const sufixTitle = title && title !== ' ';
    document.title = sufixTitle ? `${config.APP_NAME} - ${title}` : config.APP_NAME;
  }, [title]);

  return (
    <IonPage id={camelCase(location.pathname) || 'home'}>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          {title && <IonTitle>{title}</IonTitle>}
          <IonButtons slot="end">
            <ProfileHeaderButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {title && (
          <IonHeader mode="md" collapse="condense">
            <IonToolbar>
              <IonTitle size="large">{title}</IonTitle>
            </IonToolbar>
          </IonHeader>
        )}
        <div style={{ minHeight: 'calc(100vh - 130px)' }} className={noPadding ? '' : 'ion-padding'}>
          {children}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};
