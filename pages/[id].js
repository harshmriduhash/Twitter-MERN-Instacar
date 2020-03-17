import React from 'react';
import { Login, Register, Logout } from '../components';
import { useRouter } from 'next/router';

const DynamicPage = () => {
	const router = useRouter();
	const { id } = router.query;
	let pageState; 
	if(id === 'login') {
		return pageState = <Login />
	}
	if(id === 'register'){
		return pageState = <Register />
	}
	if(id === 'logout'){
		return pageState = <Logout />
	}

	return <div>{pageState}</div>
};

export default DynamicPage;
