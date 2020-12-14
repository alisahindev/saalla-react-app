export const GET_UNREADS_REQUEST = 'GET_UNREADS_REQUEST';
export const GET_UNREADS_SUCCESS = 'GET_UNREADS_SUCCESS';
export const GET_UNREADS_FAILURE = 'GET_UNREADS_FAILURE';

export const MARK_AS_READ_REQUEST = 'MARK_AS_READ_REQUEST';
export const MARK_AS_READ_SUCCESS = 'MARK_AS_READ_SUCCESS';
export const MARK_AS_READ_FAILURE = 'MARK_AS_READ_FAILURE';


export const getUnreadsRequest = () => ({
  type: GET_UNREADS_REQUEST,
});

export const markAsReadRequest = payload => ({
  type: MARK_AS_READ_REQUEST,
  payload
});


