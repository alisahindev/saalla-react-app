import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from "./users/reducers";
import communities from "./community/reducers";
import loader from "./loader/reducers";
import auth from "./auth/reducers";
import postDetail from "./posts/postDetailReducer";
import home from "./home/reducers";
import community from "./community/selectedCommunityReducer";
import posts from "./posts/reducers";
import ofModerators from "./community/ofModeratorsReducer";
import userCommunities from "./community/userCommunitiesReducer";
import communityUsers from "./community/communityUsersReducer";
import errors from "./error/reducer";
import categories from "./category/reducers";
import comsByCategory from "./category/comsByCategoryReducer";
import conversations from "./conversation/reducers";
import selectedConversation from "./conversation/conversationReducer";
import notifications from "./notifications/reducers";
import unReads from "./notifications/unReadsReducer";
import unReadMessages from "./messages/reducers";
import profilePosts from "./profile/postsReducer";
import profileData from "./profile/reducers";

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    communities,
    loader,
    auth,
    postDetail,
    home,
    community,
    posts,
    ofModerators,
    userCommunities,
    communityUsers,
    errors,
    categories,
    comsByCategory,
    conversations,
    selectedConversation,
    notifications,
    unReads,
    unReadMessages,
    profilePosts,
    profileData
  })
