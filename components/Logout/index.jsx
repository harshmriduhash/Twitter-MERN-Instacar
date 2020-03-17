import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';

const Logout = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleSubmit = () => {
		dispatch({ type: 'LOGOUT_USER'});
		router.push({
			pathname: '/',
		});
	};
	return (
		<div>
			<Button variant="contained" color="primary" onClick={() => handleSubmit()}>Logout</Button>
		</div>
	)
};
export default Logout;
