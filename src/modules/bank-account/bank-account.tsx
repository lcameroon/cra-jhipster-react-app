import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './bank-account.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';

export const BankAccount = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const bankAccountList = useAppSelector((state) => state.bankAccount.entities);
  const loading = useAppSelector((state) => state.bankAccount.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, [dispatch]);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="bank-account-heading" data-cy="BankAccountHeading">
        Bank Accounts
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />
            &nbsp; Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Bank Account
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bankAccountList && bankAccountList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Balance</th>
                <th>User</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bankAccountList.map((bankAccount, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${bankAccount.id}`} color="link" size="sm">
                      {bankAccount.id}
                    </Button>
                  </td>
                  <td>{bankAccount.name}</td>
                  <td>{bankAccount.balance}</td>
                  <td>{bankAccount.user ? bankAccount.user.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bankAccount.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bankAccount.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bankAccount.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Bank Accounts found</div>
        )}
      </div>
    </div>
  );
};

export default BankAccount;
