import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { Table, Badge, Col, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../../config/store';
import HealthModal from './health-modal';
import { getSystemHealth } from '../administration.reducer';

export const HealthPage = () => {
  const [healthObject, setHealthObject] = useState({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const health = useAppSelector((state) => state.administration.health);
  const isFetching = useAppSelector((state) => state.administration.loading);

  useEffect(() => {
    dispatch(getSystemHealth());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSystemHealth = () => {
    if (!isFetching) {
      dispatch(getSystemHealth());
    }
  };

  const getSystemHealthInfo = (name, healthObj) => () => {
    setShowModal(true);
    setHealthObject({ ...healthObj, name });
  };

  const handleClose = () => setShowModal(false);

  const renderModal = () => <HealthModal healthObject={healthObject} handleClose={handleClose} showModal={showModal} />;

  const data = (health || {}).components || {};

  return (
    <div>
      <h2 id="health-page-heading" data-cy="healthPageHeading">
        Health Checks
      </h2>
      <p>
        <Button onClick={fetchSystemHealth} color={isFetching ? 'btn btn-danger' : 'btn btn-primary'} disabled={isFetching}>
          <FontAwesomeIcon icon="sync" />
          &nbsp;
          <Translate component="span" contentKey="health.refresh.button">
            Refresh
          </Translate>
        </Button>
      </p>
      <Row>
        <Col md="12">
          <Table bordered aria-describedby="health-page-heading">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((configPropKey, configPropIndex) =>
                configPropKey !== 'status' ? (
                  <tr key={configPropIndex}>
                    <td>{configPropKey}</td>
                    <td>
                      <Badge color={data[configPropKey].status !== 'UP' ? 'danger' : 'success'}>{data[configPropKey].status}</Badge>
                    </td>
                    <td>
                      {data[configPropKey].details ? (
                        // eslint-disable-next-line jsx-a11y/anchor-is-valid
                        <a onClick={getSystemHealthInfo(configPropKey, data[configPropKey])}>
                          <FontAwesomeIcon icon="eye" />
                        </a>
                      ) : null}
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      {renderModal()}
    </div>
  );
};

export default HealthPage;
