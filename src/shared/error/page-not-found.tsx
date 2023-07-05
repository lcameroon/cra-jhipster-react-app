import React from 'react';
import { Alert } from 'reactstrap';

const PageNotFound: React.FC = () => {
  return (
    <div>
      <Alert color="danger">The page does not exist.</Alert>
    </div>
  );
};

export default PageNotFound;
