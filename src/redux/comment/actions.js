export const CREATE_COMMENT_REQUEST = 'CREATE_COMMENT_REQUEST';
export const CREATE_COMMENT_SUCCESS = 'CREATE_COMMENT_SUCCESS';
export const CREATE_COMMENT_FAILURE = 'CREATE_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const DELETE_COMMENT_MODERATOR_REQUEST = 'DELETE_COMMENT_MODERATOR_REQUEST';
export const DELETE_COMMENT_MODERATOR_SUCCESS = 'DELETE_COMMENT_MODERATOR_SUCCESS';
export const DELETE_COMMENT_MODERATOR_FAILURE = 'DELETE_COMMENT_MODERATOR_FAILURE';

export const CREATE_REPLY_REQUEST = 'CREATE_REPLY_REQUEST';
export const CREATE_REPLY_SUCCESS = 'CREATE_REPLY_SUCCESS';
export const CREATE_REPLY_FAILURE = 'CREATE_REPLY_FAILURE';

export const DELETE_REPLY_REQUEST = 'DELETE_REPLY_REQUEST';
export const DELETE_REPLY_SUCCESS = 'DELETE_REPLY_SUCCESS';
export const DELETE_REPLY_FAILURE = 'DELETE_REPLY_FAILURE';

export const DELETE_REPLY_MODERATOR_REQUEST = 'DELETE_REPLY_MODERATOR_REQUEST';
export const DELETE_REPLY_MODERATOR_SUCCESS = 'DELETE_REPLY_MODERATOR_SUCCESS';
export const DELETE_REPLY_MODERATOR_FAILURE = 'DELETE_REPLY_MODERATOR_FAILURE';

export const LIKE_COMMENT_REQUEST = 'LIKE_COMMENT_REQUEST';
export const LIKE_COMMENT_SUCCESS = 'LIKE_COMMENT_SUCCESS';
export const LIKE_COMMENT_FAILURE = 'LIKE_COMMENT_FAILURE';

export const UNLIKE_COMMENT_REQUEST = 'UNLIKE_COMMENT_REQUEST';
export const UNLIKE_COMMENT_SUCCESS = 'UNLIKE_COMMENT_SUCCESS';
export const UNLIKE_COMMENT_FAILURE = 'UNLIKE_COMMENT_FAILURE';

export const LIKE_REPLY_REQUEST = 'LIKE_REPLY_REQUEST';
export const LIKE_REPLY_SUCCESS = 'LIKE_REPLY_SUCCESS';
export const LIKE_REPLY_FAILURE = 'LIKE_REPLY_FAILURE';

export const UNLIKE_REPLY_REQUEST = 'UNLIKE_REPLY_REQUEST';
export const UNLIKE_REPLY_SUCCESS = 'UNLIKE_REPLY_SUCCESS';
export const UNLIKE_REPLY_FAILURE = 'UNLIKE_REPLY_FAILURE';

export const createCommentRequest = payload => ({
  type: CREATE_COMMENT_REQUEST,
  payload,
});

export const createReplyRequest = payload => ({
  type: CREATE_REPLY_REQUEST,
  payload,
});

export const deleteCommentRequest = payload => ({
  type: DELETE_COMMENT_REQUEST,
  payload,
});

export const deleteCommentModeratorRequest = payload => ({
  type: DELETE_COMMENT_MODERATOR_REQUEST,
  payload,
});

export const likeCommentRequest = payload => ({
  type: LIKE_COMMENT_REQUEST,
  payload,
});

export const unlikeCommentRequest = payload => ({
  type: UNLIKE_COMMENT_REQUEST,
  payload,
});

export const deleteReplyRequest = payload => ({
  type: DELETE_REPLY_REQUEST,
  payload,
});

export const deleteReplyModeratorRequest = payload => ({
  type: DELETE_REPLY_MODERATOR_REQUEST,
  payload,
});

export const likeReplyRequest = payload => ({
  type: LIKE_REPLY_REQUEST,
  payload,
});

export const unlikeReplyRequest = payload => ({
  type: UNLIKE_REPLY_REQUEST,
  payload,
});



