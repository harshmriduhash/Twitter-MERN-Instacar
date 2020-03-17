import React, { useRef, useState } from 'react';
import { Container } from './styles';
import { Input, Button } from '@material-ui/core';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const serverUrl = 'https://instacarapi.herokuapp.com/'; 

const Register = () => {
	const router = useRouter(); 
	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();

	const dispatch = useDispatch();
	
	const handleSubmit =() => {
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const name = nameRef.current.value;
		const response = axios.post( serverUrl + '/register', { email: email, password: password, name: name } ); 
		response.then((data) => {
			console.log(data.data, 'dataaaaaaa');
			if(data.data === "Email Already Exist") {
				alert('Already a user, Please login to continue');
				router.push({
					pathname: '/login'
				});
			}else {
				dispatch({ type: 'REGISTER', payload: { email, name } });
				router.push({
					pathname: '/car-search',
				});
			}
		}).catch((e) => alert(e));
	};
	
return (
	<Container>
		<Input placeholder="Enter name" name="name" inputRef={nameRef} /><br />
		<Input placeholder="Enter email" name="email" inputRef={emailRef} /><br />
		<Input placeholder="Enter password" name="email" inputRef={passwordRef} type="password" /><br /><br />
		<Button variant="contained" color="primary" onClick={() => handleSubmit()}>Register</Button>
		<br /><br />
		Already a User !<Button variant="contained" color="primary" onClick={() => router.push("/login")}>Login</Button>
	</Container>
  )
}

export default Register;
