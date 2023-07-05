import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './bank-account.reducer';

import { useAppDispatch, useAppSelector } from '../../config/store';

export const BankAccountDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bankAccountEntity = useAppSelector((state) => state.bankAccount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bankAccountDetailsHeading">BankAccount</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bankAccountEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{bankAccountEntity.name}</dd>
          <dt>
            <span id="balance">Balance</span>
          </dt>
          <dd>{bankAccountEntity.balance}</dd>
          <dt>User</dt>
          <dd>{bankAccountEntity.user ? bankAccountEntity.user.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/bank-account" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline"> Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank-account/${bankAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />
          <span className="d-none d-md-inline"> Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BankAccountDetail;
