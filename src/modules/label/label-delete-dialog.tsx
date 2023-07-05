import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../config/store';
import { getEntity, deleteEntity } from './label.reducer';

export const LabelDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelEntity = useAppSelector((state) => state.label.entity);
  const updateSuccess = useAppSelector((state) => state.label.updateSuccess);

  const handleClose = () => {
    props.history.push('/label');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(`${labelEntity.id}`));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="labelDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="jhipsterSampleApplicationReactApp.label.delete.question">Are you sure you want to delete this Label?</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button id="jhi-confirm-delete-label" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default LabelDeleteDialog;
