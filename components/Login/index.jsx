import React, { useRef, useState } from 'react';
import { Container } from './styles';
import { Input, Button } from '@material-ui/core';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const serverUrl = 'http://localhost:3001'; 

const Login = () => {

	const router = useRouter();

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const dispatch = useDispatch();
	const [error, setError] = useState();

	const handleSubmit = ( ) => {
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		
		if (email.length < 0 ) {
			setError('Please enter valid email id');
		}
		if(password.length < 4){
			setError('Please Enter password of atleast 4 characters');
		};
		const response = axios.post('/login', { email, password }); 
		response.then((data) => {
			if(data.data === "Wrong password, unable to login"){
				setError('You have enteredt wrong password or email');
				return
			}
			if(data.data === 'User not found' ){
				setError('Please register to continue');
				router.push({
					pathname: '/register'
				});
				return
			}
			dispatch({ type: 'LOGIN_EMAIL', payload: { email, name } });
			setError('Successfully logged in');
			router.push({
				pathname: '/car-search',

			});
		}).catch((e) =>e);
	}
return (
	<Container>
		<Input placeholder="Enter name" name="name" type="name" inputRef={nameRef} /><br />
		<Input placeholder="Enter email" name="email" type="email" inputRef={emailRef} /><br />
		<Input placeholder="Enter password" name="password"  type="password" inputRef={passwordRef} /><br /><br />
		{error ? <p>{error}</p>: null}<br /><br />
 		<Button variant="contained" color="primary" onClick={() => handleSubmit()}>Login</Button>
	</Container>
  )
};

export default Login;
