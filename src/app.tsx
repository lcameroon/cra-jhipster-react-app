import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import './config/dayjs';

import React, { useEffect } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from './config/store';
import { getSession } from './shared/reducers/authentication';
import { getProfile } from './shared/reducers/application-profile';
import Header from './shared/layout/header/header';
import Footer from './shared/layout/footer/footer';
import { hasAnyAuthority } from './shared/auth/private-route';
import ErrorBoundary from './shared/error/error-boundary';
import { AUTHORITIES } from './config/constants';
import AppRoutes from './routes';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
    dispatch(getProfile());
  }, [dispatch]);

  const currentLocale = useAppSelector((state) => state.locale.currentLocale);
  const isAuthenticated = useAppSelector((state) => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector((state) => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector((state) => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector((state) => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector((state) => state.applicationProfile.isOpenAPIEnabled);

  const paddingTop = '60px';
  return (
    <Router>
      <div className="app-container" style={{ paddingTop }}>
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Header
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            currentLocale={currentLocale}
            ribbonEnv={ribbonEnv}
            isInProduction={isInProduction}
            isOpenAPIEnabled={isOpenAPIEnabled}
          />
        </ErrorBoundary>
        <div className="container-fluid view-container" id="app-view-container">
          <Card className="jh-card">
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </Card>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
