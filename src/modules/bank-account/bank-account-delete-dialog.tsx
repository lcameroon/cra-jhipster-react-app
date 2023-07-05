import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { useAppDispatch, useAppSelector } from '../../config/store';
import { getEntity, deleteEntity } from './bank-account.reducer';

export const BankAccountDeleteDialog = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const bankAccountEntity = useAppSelector((state) => state.bankAccount.entity);
  const updateSuccess = useAppSelector((state) => state.bankAccount.updateSuccess);

  const handleClose = () => {
    props.history.push('/bank-account');
  };

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateSuccess]);

  const confirmDelete = () => {
    dispatch(deleteEntity(`${bankAccountEntity.id}`));
  };

  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose} data-cy="bankAccountDeleteDialogHeading">
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="jhipsterSampleApplicationReactApp.bankAccount.delete.question">
        Are you sure you want to delete this BankAccount?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button id="jhi-confirm-delete-bankAccount" data-cy="entityConfirmDeleteButton" color="danger" onClick={confirmDelete}>
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default BankAccountDeleteDialog;
