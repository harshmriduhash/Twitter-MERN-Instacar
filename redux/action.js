export const login = (email, name) => ({
	type: 'LOGIN_EMAIL',
	payload: {email, name},
});
export const logout = () => ({
	type: 'LOGOUT_USER',
});

export const register = ( email, name ) => ({
	type: 'REGISTER',
	payload: {email, name},
});

export const searchData = (data) => ({
	type: 'SEARCH_DATA',
	payload: data,	
});
export const filterData = (data) => ({
	type: 'ADD_FILTER',
	payload: data,
});






