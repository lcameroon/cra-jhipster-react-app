import React from 'react';

import { useAppSelector } from '../../config/store';
import { IonButton, IonContent, IonIcon, IonItem, IonLabel, IonList, IonPopover } from '@ionic/react';
import { logOutOutline, personCircleOutline } from 'ionicons/icons';

export const ProfileHeaderButton: React.FC = () => {
  const isAuthenticated = useAppSelector(({ auth }) => auth.isAuthenticated);

  return isAuthenticated ? (
    <>
      <IonButton id="profile-button" fill="clear">
        <IonIcon slot="icon-only" icon={personCircleOutline} />
      </IonButton>
      <IonPopover trigger="profile-button" side="bottom" alignment="end" dismissOnSelect>
        <IonContent>
          <IonList>
            {isAuthenticated && (
              <IonItem routerLink="/account/settings" detail lines="inset">
                <IonIcon slot="start" icon={personCircleOutline} />
                <IonLabel>Profile</IonLabel>
              </IonItem>
            )}
            <IonItem routerLink="/logout" detail lines="none">
              <IonIcon slot="start" icon={logOutOutline} />
              <IonLabel>Logout</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  ) : null;
};
