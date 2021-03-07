// Elements
export const placeItemCard = 'div[data-test="placeItem"]';
export const userItemCard = (user) => `div[data-test="${user}_userCard"]`;
export const unlikePlaceEl = (elName) => `button[data-test="${elName}_unlike"]`;
export const likePlaceEl = (elName) => `button[data-test="${elName}_like"]`;
export const likeCount = `small[data-test="likeCount"]`;
export const followButton = `button[data-test="followButton"]`;
export const unfollowButton = `button[data-test="unfollowButton"]`;
export const followCount = `small[data-test="usersCount"]`;
export const addPlaceNav = 'a[data-test="addPlace"]';
export const newPlaceForm = 'form[data-test="newPlaceForm"]';
export const inputTitle = 'input[data-test="inputTitle"]';
export const selectType = 'select[data-test="selectType"]';
export const inputAddress = 'input[data-test="inputAddress"]';
export const addPlaceButton = 'button[data-test="addPlaceButton"]';
export const updatePlaceButton = 'button[data-test="updatePlaceButton"]';
export const inputDescription = 'textarea[data-test="inputDescription"]';
export const getMyPlaces = 'a[data-test="userPlaces"]';
export const edit4 = 'a[data-test="TestPlace4_edit"]';
export const viewMap = 'button[data-test="viewMap"]';
export const mapModal = 'div[data-test="mapModal"]';
export const closeMapModal = 'button[data-test="closeMap"]';
export const cardDescription = 'div[data-test="placeDescr"]';
export const cardMaps = 'div[data-test="placeMapsDetails"]';
export const deletePlace = (placeNum) =>
  `button[data-test="deletePlace_${placeNum}"]`;
export const deleteConfrim = 'button[data-test="confirmDelete"]';
export const cancelConfirm = 'button[data-test="cancelDelete"]';
export const addComment = 'input[data-test="addComment"]';
export const addCommentButton = 'button[data-test="addCommentButton"]';
export const commentText = 'div[data-test="commentText"]';
export const deleteComment = 'button[data-test="deleteComment"]';

// Text
export const placeTest = "Test place";
export const placeIncorrectTitle = "Incorrect Title, sorry!";
export const placeAbout =
  "This is a test about string. It is a very good think to check if things work as expected and this is why we test.";
export const placeIncorrectAbout = `Incorrect About, too long m8, sorry!`;
export const placeAddress = "21 Szczesliwicka, Warsaw, Poland";
export const placeIncorrectAddress = `Incorrect Address, sorry.`;
export const placeDescription =
  "This is a test description, created for test purposes only. Good to know if this field works as well.";
export const errorAddress = `Invalid address. Correct address format example: 10 Long Street, Big City, Super Country.`;
