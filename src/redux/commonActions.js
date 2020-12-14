export const CLEAR_HOME = 'CLEAR_HOME';
export const CLEAR_COMMUNITY = 'CLEAR_COMMUNITY';
export const CLEAR_USER = 'CLEAR_USER';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';
export const CLEAR_COMMUNITY_PAGE = 'CLEAR_COMMUNITY_PAGE';


export const clearStoreRequest = name => {
    switch (name) {
        case "home_posts":
            return ({
                type: CLEAR_HOME,
            });
        case "community_posts":
            return ({
                type: CLEAR_COMMUNITY,
            });
        case "profile_posts":
            return ({
                type: CLEAR_PROFILE,
            });
        case "user_posts":
            return ({
                type: CLEAR_USER,
            });
        case "community_oage":
            return ({
                type: CLEAR_COMMUNITY_PAGE,
            });
        default:
            break;
    }
}