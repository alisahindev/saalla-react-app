export const GET_POPULAR_LIST_REQUEST = 'GET_POPULAR_LIST_REQUEST';
export const GET_POPULAR_LIST_SUCCESS = 'GET_POPULAR_LIST_SUCCESS';
export const GET_POPULAR_LIST_FAILURE = 'GET_POPULAR_LIST_FAILURE';

export const GET_COMMUNITY_REQUEST = 'GET_COMMUNITY_REQUEST';
export const GET_COMMUNITY_SUCCESS = 'GET_COMMUNITY_SUCCESS';
export const GET_COMMUNITY_FAILURE = 'GET_COMMUNITY_FAILURE';

export const GET_COMMUNITY_POSTS_REQUEST = 'GET_COMMUNITY_POSTS_REQUEST';
export const GET_COMMUNITY_POSTS_SUCCESS = 'GET_COMMUNITY_POSTS_SUCCESS';
export const GET_COMMUNITY_POSTS_FAILURE = 'GET_COMMUNITY_POSTS_FAILURE';

export const GET_ALL_COMMUNITY_REQUEST = 'GET_ALL_COMMUNITY_REQUEST';
export const GET_ALL_COMMUNITY_SUCCESS = 'GET_ALL_COMMUNITY_SUCCESS';
export const GET_ALL_COMMUNITY_FAILURE = 'GET_ALL_COMMUNITY_FAILURE';

export const GET_USER_COMMUNITIES_REQUEST = 'GET_USER_COMMUNITIES_REQUEST';
export const GET_USER_COMMUNITIES_SUCCESS = 'GET_USER_COMMUNITIES_SUCCESS';
export const GET_USER_COMMUNITIES_FAILURE = 'GET_USER_COMMUNITIES_FAILURE';

export const OF_MODERATORS_REQUEST = 'OF_MODERATORS_REQUEST';
export const OF_MODERATORS_SUCCESS = 'OF_MODERATORS_SUCCESS';
export const OF_MODERATORS_FAILURE = 'OF_MODERATORS_FAILURE';

export const UPDATE_COMMUNITY_REQUEST = 'UPDATE_COMMUNITY_REQUEST';
export const UPDATE_COMMUNITY_SUCCESS = 'UPDATE_COMMUNITY_SUCCESS';
export const UPDATE_COMMUNITY_FAILURE = 'UPDATE_COMMUNITY_FAILURE';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';


export const getPopularCommnityListRequest = payload => ({
  type: GET_POPULAR_LIST_REQUEST,
  payload,
});

export const getCommunityRequest = payload => ({
  type: GET_COMMUNITY_REQUEST,
  payload,
});

export const getCommunityPostsRequest = payload => ({
  type: GET_COMMUNITY_POSTS_REQUEST,
  payload,
});

export const getUserCommunitiesRequest = payload => ({
  type: GET_USER_COMMUNITIES_REQUEST,
  payload,
});

export const ofModeratorsRequest = () => ({
  type: OF_MODERATORS_REQUEST,
});

export const updateCommunityRequest = payload => ({
  type: UPDATE_COMMUNITY_REQUEST,
  payload
});

export const getUsers = payload => ({
  type: GET_USERS_REQUEST,
  payload
});

export const deleteUserRequest = payload => ({
  type: DELETE_USER_REQUEST,
  payload
});

export const getAllCommunitiesRequest = () => ({
  type: GET_ALL_COMMUNITY_REQUEST,
});