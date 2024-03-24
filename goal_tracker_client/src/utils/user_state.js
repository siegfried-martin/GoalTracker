let user = null

const getGlobalUser = () => user;
const setGlobalUser = (newUser) => user = newUser;

export { getGlobalUser, setGlobalUser };