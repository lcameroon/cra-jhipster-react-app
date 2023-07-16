import { IonItem, IonLabel } from '@ionic/react';
import React from 'react';

export const NoItemsFound: React.FC = () => {
  return (
    <IonItem lines="none">
      <IonLabel>No Items found</IonLabel>
    </IonItem>
  );
};
