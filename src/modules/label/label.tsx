import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { refreshOutline } from 'ionicons/icons';

import { getEntities } from './label.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { CommonPage, Loading, NoItemsFound } from '../../shared/components';

export const Label: React.FC<RouteComponentProps<{ url: string }>> = ({ match, history }) => {
  const dispatch = useAppDispatch();

  const labelList = useAppSelector((state) => state.label.entities);
  const loading = useAppSelector((state) => state.label.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []); // eslint-disable-line

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <CommonPage title="Labels">
      <div className="ion-content-max-width">
        <div className="d-block ion-text-end ion-padding-end">
          <IonButton color="primary" onClick={handleSyncList} disabled={loading} fill="outline" shape="round">
            <IonIcon slot="icon-only" icon={refreshOutline} />
          </IonButton>
          <IonButton onClick={() => history.push(`${match.url}/new`)} color="primary" shape="round">
            Create Label
          </IonButton>
        </div>
        <h6 style={{ marginTop: -42 }} className="ion-no-margin ion-padding opacity-50 w-50">
          List of Labels
        </h6>
        <div className="ion-card">
          {loading && <Loading />}
          <IonList>
            {labelList.map((item, i) => (
              <IonItem
                key={item.id}
                button
                detail
                disabled={loading}
                onClick={() => history.push(`${match.url}/${item.id}`)}
                lines={labelList.length - 1 === i ? 'none' : 'full'}
              >
                <IonLabel>
                  <h2>{item.label}</h2>
                  <p>{item.id}</p>
                </IonLabel>
              </IonItem>
            ))}
            {!loading && !labelList.length && <NoItemsFound />}
          </IonList>
        </div>
      </div>
    </CommonPage>
  );
};

export default Label;
