import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';

import { getEntities } from './label.reducer';
import { useAppDispatch, useAppSelector } from '../../config/store';

export const Label = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const labelList = useAppSelector((state) => state.label.entities);
  const loading = useAppSelector((state) => state.label.loading);

  useEffect(() => {
    dispatch(getEntities({}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="label-heading" data-cy="LabelHeading">
        Labels
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            Refresh List
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            Create Label
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {labelList && labelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Label</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {labelList.map((label, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${label.id}`} color="link" size="sm">
                      {label.id}
                    </Button>
                  </td>
                  <td>{label.label}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${label.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        View
                      </Button>
                      <Button tag={Link} to={`${match.url}/${label.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        Edit
                      </Button>
                      <Button tag={Link} to={`${match.url}/${label.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Labels found</div>
        )}
      </div>
    </div>
  );
};

export default Label;
