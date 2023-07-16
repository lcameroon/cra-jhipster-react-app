import 'react-toastify/dist/ReactToastify.css';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './app.scss';
import './config/dayjs';

import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useEffect } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from './config/store';
import { getSession } from './shared/reducers/auth';
import ErrorBoundary from './shared/error/error-boundary';
import { AppMenu } from './shared/layout/menus';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';

setupIonicReact({ rippleEffect: false });

const Router = BrowserRouter as any; // Workaroud for React 18

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getSession());
  }, [dispatch]);

  const darkMode = useAppSelector((state) => state.appShared.darkMode);

  useEffect(() => {
    document.body.className = `${darkMode ? 'dark-theme' : ''}`;
  }, [darkMode]);

  return (
    <>
      <ToastContainer
        hideProgressBar
        position={toast.POSITION.TOP_CENTER}
        transition={Slide}
        className="toastify-container"
        toastClassName="toastify-toast"
        theme="colored"
      />
      <IonApp>
        <Router>
          <IonSplitPane contentId="main">
            <AppMenu />
            <IonRouterOutlet id="main">
              <ErrorBoundary>
                <AppRoutes />
              </ErrorBoundary>
            </IonRouterOutlet>
          </IonSplitPane>
        </Router>
      </IonApp>
    </>
  );
};

export default App;
