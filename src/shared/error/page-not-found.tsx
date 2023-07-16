import { IonAlert } from '@ionic/react';
import React from 'react';

const PageNotFound: React.FC = () => {
  return (
    <div className="ion-padding ion-text-center">
      <IonAlert color="danger">The page does not exist.</IonAlert>
    </div>
  );
};

export default PageNotFound;
