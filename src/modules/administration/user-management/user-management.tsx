import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { refreshOutline } from 'ionicons/icons';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import { CommonPage, Loading, NoItemsFound } from '../../../shared/components';
import { IonButton, IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { getUsers } from './user-management.reducer';
import { IUser } from '../../../shared/model/user.model';

export const UserManagement: React.FC<RouteComponentProps<any>> = ({ match, history }) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.administration.userManagement.users);
  const loading = useAppSelector((state) => state.administration.userManagement.loading);

  useEffect(() => {
    dispatch(getUsers());
  }, []); // eslint-disable-line

  const handleSyncList = () => dispatch(getUsers());

  const handleOnCreate = () => history.push(`${match.url}/new`);

  const handleOnView = (entity: IUser) => () => history.push(`${match.url}/${entity.id}`);

  return (
    <CommonPage title="Users">
      <div className="ion-content-max-width">
        <div className="d-block ion-text-end ion-padding-end">
          <IonButton fill="outline" onClick={handleSyncList} disabled={loading} shape="round">
            <IonIcon slot="icon-only" icon={refreshOutline} />
          </IonButton>
          <IonButton color="primary" onClick={handleOnCreate} disabled={loading} shape="round">
            Create a new user
          </IonButton>
        </div>
        <h6 style={{ marginTop: -42 }} className="ion-no-margin ion-padding opacity-50 w-50">
          List of Users
        </h6>
        <div className="ion-card">
          {loading && <Loading />}
          <IonList>
            {users.map((item, i) => (
              <IonItem
                key={item.id}
                button
                detail
                disabled={loading}
                onClick={handleOnView(item)}
                lines={users.length - 1 === i ? 'none' : 'full'}
              >
                <IonLabel>
                  <h2>{item.displayName}</h2>
                  <p>{item.email}</p>
                </IonLabel>
              </IonItem>
            ))}
            {!loading && !users.length && <NoItemsFound />}
          </IonList>
        </div>
      </div>
    </CommonPage>
  );
};

export default UserManagement;
