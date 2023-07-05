import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { getUser, deleteUser } from './user-management.reducer';
import { useAppDispatch, useAppSelector } from '../../../config/store';

export const UserManagementDeleteDialog = (props: RouteComponentProps<{ login: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser(props.match.params.login));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = (event) => {
    event.stopPropagation();
    props.history.push('/admin/user-management');
  };

  const user = useAppSelector((state) => state.userManagement.user);

  const confirmDelete = (event) => {
    dispatch(deleteUser(`${user.login}`));
    handleClose(event);
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>Confirm delete operation</ModalHeader>
      <ModalBody>Are you sure you want to delete this User?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserManagementDeleteDialog;
