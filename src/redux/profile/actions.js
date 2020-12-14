export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';

export const GET_PROFILE_POSTS_REQUEST = 'GET_PROFILE_POSTS_REQUEST';
export const GET_PROFILE_POSTS_SUCCESS = 'GET_PROFILE_POSTS_SUCCESS';
export const GET_PROFILE_POSTS_FAILURE = 'GET_PROFILE_POSTS_FAILURE';

export const updateProfileRequest = payload => ({
  type: UPDATE_PROFILE_REQUEST,
  payload,
});

export const getProfileRequest = payload => ({
  type: GET_PROFILE_REQUEST,
  payload,
});

export const getProfilePostsRequest = payload => ({
  type: GET_PROFILE_POSTS_REQUEST,
  payload,
});

