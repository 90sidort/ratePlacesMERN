// Elements
export const placeItemCard = 'div[data-test="placeItem"]';
export const userItemCard = (user) => `div[data-test="${user}_userCard"]`;
export const unlikePlaceEl = (elName) => `button[data-test="${elName}_unlike"]`;
export const likePlaceEl = (elName) => `button[data-test="${elName}_like"]`;
export const likeCount = `small[data-test="likeCount"]`;
export const followButton = `button[data-test="followButton"]`;
export const unfollowButton = `button[data-test="unfollowButton"]`;
export const followCount = `small[data-test="usersCount"]`;
