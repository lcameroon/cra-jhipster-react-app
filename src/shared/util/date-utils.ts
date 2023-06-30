import dayjs from 'dayjs';

import { APP_LOCAL_DATETIME_FORMAT } from '../../config/constants';

export const convertDateTimeFromServer = (date) => (date ? dayjs(date).format(APP_LOCAL_DATETIME_FORMAT) : null);

export const convertDateTimeToServer = (date) => (date ? dayjs(date).toDate() : null);

export const displayDefaultDateTime = () => dayjs().startOf('day').format(APP_LOCAL_DATETIME_FORMAT);
