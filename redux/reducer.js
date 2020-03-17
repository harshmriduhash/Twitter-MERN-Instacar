const initialState = {
	userName: '',
	userEmail: ' ',
	isLoggedIn: false,
	isRegistered: false,
	searchData : { },
	filterData: { },
	distance: 300,
};

export default function reducer (state = initialState, action) {
	switch (action.type) {
		case 'LOGIN_EMAIL' :
			return { ...state, userEmail: action.payload.email, userName: action.payload.name, isLoggedIn: true }
		case 'LOGOUT_USER':
			return { ...state, isLoggedIn : false, userEmail: ' ', userName: ' ', searchData: { }, searchDate: [ ], filterData: { }, distance: 0 };
		case 'REGISTER':
			return { ...state, isRegistered: true, userEmail: action.payload.email, userName: action.payload.name }
		case 'ADD_SEARCH_DATA':
			return { ...state , searchData: action.payload }
		case 'ADD_FILTER':
			return { ...state, filterData: action.payload }
		default :
			return state;
	};
};

