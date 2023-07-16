import React from 'react';
import { config } from '../../../config/constants';

const Footer: React.FC = () => (
  <div className="footer ion-margin-top ion-padding ion-text-center border-top">
    {new Date().getFullYear()} &copy; {config.APP_NAME}
  </div>
);

export default Footer;
