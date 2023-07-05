import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from '../shared/reducers/reducer.utils';

const notificationMiddleware = () => (next: any) => (action: any) => {
  const { error, payload } = action;

  const getMessageByCode = (code: string, message: string) => {
    return message || 'Code message not found';
  };

  // Success
  if (isFulfilledAction(action) && payload) {
    // by code
    if (payload.code && payload.message) {
      toast.success(getMessageByCode(payload.code, payload.message));
    }
    // successMessage
    else if (payload.successMessage) {
      toast.success(payload.successMessage);
    }
  }

  // Rejected Error
  if (isRejectedAction(action) && payload) {
    // by stack message
    if (payload.stack && payload.message) {
      toast.error(payload.message);
    }
    // by code
    else if (payload.code && payload.message) {
      toast.error(getMessageByCode(payload.code, payload.message));
    }
    // by errorMessage
    else if (payload.errorMessage) {
      toast.error(payload.errorMessage);
    }
  }
  // Action Error
  else if (error) {
    if (error.code && error.message) {
      toast.error(getMessageByCode(error.code, error.message));
    } else {
      toast.error(error.message || 'Unknown error!');
    }
  }

  return next(action);
};

export default notificationMiddleware;
