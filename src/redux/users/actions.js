export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const GET_USER_BY_USERNAME_REQUEST = 'GET_USER_BY_USERNAME_REQUEST';
export const GET_USER_BY_USERNAME_SUCCESS = 'GET_USER_BY_USERNAME_SUCCESS';
export const GET_USER_BY_USERNAME_FAILURE = 'GET_USER_BY_USERNAME_FAILURE';

export const JOIN_COMMUNITY_REQUEST = 'JOIN_COMMUNITY_REQUEST';
export const JOIN_COMMUNITY_SUCCESS = 'JOIN_COMMUNITY_SUCCESS';
export const JOIN_COMMUNITY_FAILURE = 'JOIN_COMMUNITY_FAILURE';

export const LEAVE_COMMUNITY_REQUEST = 'LEAVE_COMMUNITY_REQUEST';
export const LEAVE_COMMUNITY_SUCCESS = 'LEAVE_COMMUNITY_SUCCESS';
export const LEAVE_COMMUNITY_FAILURE = 'LEAVE_COMMUNITY_FAILURE';

export const SEND_SUGGEST_REQUEST = 'SEND_SUGGEST_REQUEST';
export const SEND_SUGGEST_SUCCESS = 'SEND_SUGGEST_SUCCESS';
export const SEND_SUGGEST_FAILURE = 'SEND_SUGGEST_FAILURE';

export const getUserProfile = payload => ({
  type: GET_PROFILE_REQUEST,
  payload,
});

export const getUserByUsername = username => ({
  type: GET_USER_BY_USERNAME_REQUEST,
  username,
});

export const joinCommunityRequest = (payload) => ({
  type: JOIN_COMMUNITY_REQUEST,
  payload
});

export const leaveCommunityRequest = (payload) => ({
  type: LEAVE_COMMUNITY_REQUEST,
  payload
});

export const sendSuggestRequest = (payload) => ({
  type: SEND_SUGGEST_REQUEST,
  payload
});