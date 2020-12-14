export const GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST';
export const GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS';
export const GET_NOTIFICATIONS_FAILURE = 'GET_NOTIFICATIONS_FAILURE';

export const MARK_AS_READ_REQUEST = 'MARK_AS_READ_REQUEST';
export const MARK_AS_READ_SUCCESS = 'MARK_AS_READ_SUCCESS';
export const MARK_AS_READ_FAILURE = 'MARK_AS_READ_FAILURE';

export const GET_COUNT_REQUEST = 'GET_COUNT_REQUEST';
export const GET_COUNT_SUCCESS = 'GET_COUNT_SUCCESS';
export const GET_COUNT_FAILURE = 'GET_COUNT_FAILURE';

export const getNotificationsRequest = () => ({
  type: GET_NOTIFICATIONS_REQUEST,
});

export const getCountRequest = () => ({
  type: GET_COUNT_REQUEST,
});

export const markAsReadRequest = payload => ({
  type: MARK_AS_READ_REQUEST,
  payload
});
