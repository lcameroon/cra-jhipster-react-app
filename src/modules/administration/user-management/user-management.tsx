import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Badge } from 'reactstrap';
import { Translate, TextFormat, JhiPagination, JhiItemCount, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from '../../../config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from '../../../shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from '../../../shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from '../../../config/store';
import { getUsersAsAdmin, updateUser } from './user-management.reducer';

export const UserManagement = (props: RouteComponentProps<any>) => {
  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE, 'id'), props.location.search)
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
    const sortParam = params.get(SORT);
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
      order: pagination.order === ASC ? DESC : ASC,
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
        <Translate contentKey="userManagement.home.title">Users</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="userManagement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity">
            <FontAwesomeIcon icon="plus" /> <Translate contentKey="userManagement.home.createLabel">Create a new user</Translate>
          </Link>
        </div>
      </h2>
      <Table responsive striped>
        <thead>
          <tr>
            <th className="hand" onClick={sort('id')}>
              <Translate contentKey="global.field.id">ID</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('login')}>
              <Translate contentKey="userManagement.login">Login</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('email')}>
              <Translate contentKey="userManagement.email">Email</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
            <th className="hand" onClick={sort('langKey')}>
              <Translate contentKey="userManagement.langKey">Lang Key</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th>
              <Translate contentKey="userManagement.profiles">Profiles</Translate>
            </th>
            <th className="hand" onClick={sort('createdDate')}>
              <Translate contentKey="userManagement.createdDate">Created Date</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th className="hand" onClick={sort('lastModifiedBy')}>
              <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th id="modified-date-sort" className="hand" onClick={sort('lastModifiedDate')}>
              <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
              <FontAwesomeIcon icon="sort" />
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr id={user.login} key={`user-${i}`}>
              <td>
                <Button tag={Link} to={`${match.url}/${user.login}`} color="link" size="sm">
                  {user.id}
                </Button>
              </td>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>
                {user.activated ? (
                  <Button color="success" onClick={toggleActive(user)}>
                    <Translate contentKey="userManagement.activated">Activated</Translate>
                  </Button>
                ) : (
                  <Button color="danger" onClick={toggleActive(user)}>
                    <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                  </Button>
                )}
              </td>
              <td>{user.langKey}</td>
              <td>
                {user.authorities
                  ? user.authorities.map((authority, j) => (
                      <div key={`user-auth-${i}-${j}`}>
                        <Badge color="info">{authority}</Badge>
                      </div>
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
                  <Button tag={Link} to={`${match.url}/${user.login}`} color="info" size="sm">
                    <FontAwesomeIcon icon="eye" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.view">View</Translate>
                    </span>
                  </Button>
                  <Button tag={Link} to={`${match.url}/${user.login}/edit`} color="primary" size="sm">
                    <FontAwesomeIcon icon="pencil-alt" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.edit">Edit</Translate>
                    </span>
                  </Button>
                  <Button
                    tag={Link}
                    to={`${match.url}/${user.login}/delete`}
                    color="danger"
                    size="sm"
                    disabled={account.login === user.login}
                  >
                    <FontAwesomeIcon icon="trash" />{' '}
                    <span className="d-none d-md-inline">
                      <Translate contentKey="entity.action.delete">Delete</Translate>
                    </span>
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
