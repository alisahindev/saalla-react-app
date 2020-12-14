export const GET_POST_DETAIL_REQUEST = 'GET_POST_DETAIL_REQUEST';
export const GET_POST_DETAIL_SUCCESS = 'GET_POST_DETAIL_SUCCESS';
export const GET_POST_DETAIL_FAILURE = 'GET_POST_DETAIL_FAILURE';

export const GET_MAIN_POSTS_REQUEST = 'GET_MAIN_POSTS_REQUEST';
export const GET_MAIN_POSTS_SUCCESS = 'GET_MAIN_POSTS_SUCCESS';
export const GET_MAIN_POSTS_FAILURE = 'GET_MAIN_POSTS_FAILURE';

export const GET_USER_POSTS_REQUEST = 'GET_USER_POSTS_REQUEST';
export const GET_USER_POSTS_SUCCESS = 'GET_USER_POSTS_SUCCESS';
export const GET_USER_POSTS_FAILURE = 'GET_USER_POSTS_FAILURE';

export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';

export const VOTE_POST_REQUEST = 'VOTE_POST_REQUEST';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAILURE = 'VOTE_POST_FAILURE';

export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const DELETE_MODERATOR_REQUEST = 'DELETE_MODERATOR_REQUEST';
export const DELETE_MODERATOR_SUCCESS = 'DELETE_MODERATOR_SUCCESS';
export const DELETE_MODERATOR_FAILURE = 'DELETE_MODERATOR_FAILURE';

export const getPostDetailRequest = payload => ({
  type: GET_POST_DETAIL_REQUEST,
  payload,
});

export const getMainPostsRequest = payload => ({
  type: GET_MAIN_POSTS_REQUEST,
  payload,
});

export const getUserPostsRequest = payload => ({
  type: GET_USER_POSTS_REQUEST,
  payload,
});

export const createPostRequest = payload => ({
  type: CREATE_POST_REQUEST,
  payload,
});

export const votePostRequest = payload => ({
  type: VOTE_POST_REQUEST,
  payload,
});

export const deletePostRequest = payload => ({
  type: DELETE_POST_REQUEST,
  payload,
});

export const deleteModeratorRequest = payload => ({
  type: DELETE_MODERATOR_REQUEST,
  payload,
});