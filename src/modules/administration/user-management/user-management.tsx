import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';

import { APP_DATE_FORMAT } from '../../../config/constants';
import { overridePaginationStateWithQueryParams } from '../../../shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getUsersAsAdmin, updateUser } from './user-management.reducer';

export const UserManagement = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, 20, 'id'), props.location.search)
  );

  const getUsersFromProps = () => {
    dispatch(
      getUsersAsAdmin({
        page: pagination.activePage - 1,
        size: pagination.itemsPerPage,
        sort: `${pagination.sort},${pagination.order}`,
      })
    );
    const endURL = `?page=${pagination.activePage}&sort=${pagination.sort},${pagination.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    getUsersFromProps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.activePage, pagination.order, pagination.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sortParam = params.get('SORT');
    if (page && sortParam) {
      const sortSplit = sortParam.split(',');
      setPagination({
        ...pagination,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.location.search]);

  const sort = (p) => () =>
    setPagination({
      ...pagination,
      order: pagination.order === 'ASC' ? 'DESC' : 'ASC',
      sort: p,
    });

  const handlePagination = (currentPage) =>
    setPagination({
      ...pagination,
      activePage: currentPage,
    });

  const handleSyncList = () => {
    getUsersFromProps();
  };

  const toggleActive = (user) => () =>
    dispatch(
      updateUser({
        ...user,
        activated: !user.activated,
      })
    );

  const { match } = props;
  const account = useAppSelector((state) => state.authentication.account);
  const users = useAppSelector((state) => state.userManagement.users);
  const totalItems = useAppSelector((state) => state.userManagement.totalItems);
  const loading = useAppSelector((state) => state.userManagement.loading);

  return (
    <div>
      <h2 id="user-management-page-heading" data-cy="userManagementPageHeading">
        Users
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity">
            <span> Create a new user</span>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              ID
            </th>
            <th className="hand" onClick={sort('login')}>
              Name
            </th>
            <th className="hand" onClick={sort('email')}>
              Email
            </th>
            <th />
            <th className="hand" onClick={sort('langKey')}>
              Lang Key
            </th>
            <th>Profiles</th>
            <th className="hand" onClick={sort('createdDate')}>
              Created Date
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              Last Modified By
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              Last Modified Date
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr id={user.email} key={`user-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${user.id}`} color="link" size="sm">
                  {user.id}
                </Button>
              </td>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>
                {user.activated ? (
                  <Button color="success" onClick={toggleActive(user)}>
                    Activated
                  </Button>
                ) : (
                  <Button color="danger" onClick={toggleActive(user)}>
                    Deactivated
                  </Button>
                )}
              </td>
              <td>{user.langKey}</td>
              <td>
                {user.authorities
                  ? user.authorities.map((authority, j) => (
                      <Badge key={`user-auth-${i}-${j}`} color="info">
                        {authority}
                      </Badge>
                    ))
                  : null}
              </td>
              <td>
                {user.createdDate ? <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid /> : null}
              </td>
              <td>{user.lastModifiedBy}</td>
              <td>
                {user.lastModifiedDate ? (
                  <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                ) : null}
              </td>
              <td className="text-right">
                <div className="btn-group flex-btn-group-container">
                  <Button tag={Link} to={`${match.url}/${user.id}`} color="info" size="sm">
                    View
                  </Button>
                  <Button tag={Link} to={`${match.url}/${user.id}/edit`} color="primary" size="sm">
                    Edit
                  </Button>
                  <Button tag={Link} to={`${match.url}/${user.id}/delete`} color="danger" size="sm" disabled={account.id === user.id}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {totalItems ? (
        <div className={users && users.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={pagination.activePage} total={totalItems} itemsPerPage={pagination.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={pagination.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={pagination.itemsPerPage}
              totalItems={totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default UserManagement;
