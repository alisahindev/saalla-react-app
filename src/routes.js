import React from 'react';

const PostDetail = React.lazy(() => import('./pages/PostDetail'))
const CreatePost = React.lazy(() => import('./pages/CreatePost'))
const CommunityPage = React.lazy(() => import('./pages/Community'))
const Profile = React.lazy(() => import('./pages/Profile'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const Layout = React.lazy(() => import('./components/Layout'))
const ModeratorsCommunityPage = React.lazy(() => import('./pages/Moderators/Community'))
const Chat = React.lazy(() => import('./components/Chat'))
const Explore = React.lazy(() => import('./pages/Explore'))
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'))
const Notifications = React.lazy(() => import('./pages/Notifications'))
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'))
const UserOrProfile = React.lazy(() => import('./pages/userOrProfile'))
const Verify = React.lazy(() => import('./pages/Verification'))


export const routes = [
    {
        path: "/salla",
        component: CreatePost
    },
    {
        path: "/p/:username",
        component: Profile
    },
    {
        path: "/verify/:code",
        exact: true,
        component: Verify
    },
    {
        path: "/t/:slug",
        exact: true,
        component: CommunityPage
    },
    {
        path: "/moderator/:slug",
        component: ModeratorsCommunityPage
    },
    {
        path: "/:cSlug/:pSlug",
        exact: true,
        component: PostDetail
    },
    {
        path: "/kesfet",
        component: Explore
    },
    {
        path: "/giris-yap",
        component: SignIn
    },
    {
        path: "/kaydol",
        component: SignUp
    },
    {
        path: "/chat",
        component: Chat
    },
    {
        path: "/bildirimler",
        component: Notifications
    },
    {
        path: "/sifremi-unuttum",
        component: ForgotPassword
    },
    {
        path: "/sifre-sifirla",
        component: ResetPassword
    },
    {
        path: "/:username",
        exact: true,
        component: UserOrProfile
    },
    {
        path: "/",
        exact: true,
        component: Layout
    }
]