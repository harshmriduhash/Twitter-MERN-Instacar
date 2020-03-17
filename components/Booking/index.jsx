import React, { useRef, useState } from 'react';
import { Container, FormContainer, GridContainer } from './styles';
import { Input, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/router'; 

const Booking = () => {
	
	
	const state = useSelector(state => state);
	const searchData = useSelector (state => state.searchData);
	const filterData = useSelector(state => state.filterData);

	console.log(state, 'state');
	const { userEmail, userName } = state;
	const { driver, language, cost } = filterData;
	const { origin , destination, departDate } = searchData;

	const serverUrl = 'http://localhost:3001'; 
	const router = useRouter();
	const totalCost = cost* 3000;
	const handleBooking = () => {
		const query = { driver, language, origin, destination, departDate, userEmail, userName };
		const response = axios.post('/booking', query);
		response.then((data) => {
			console.log(data.data);
			alert('Booking is confirmed');
			router.push({
				pathname: '/'
			})
		}).catch((e) => alert(e));
	};
return (
	<Container>
		<p>Traveller Details</p>
		<FormContainer>
			<GridContainer>
				<Input name="name" value={userName} disabled />
				<Input name="email" value={userEmail} disabled/>
			</GridContainer>
			<GridContainer>
				<Input name="booking date" value={departDate} disabled />
				<Input name="date" value={origin} disabled/>
			</GridContainer><br /><br />
			<h3>Total Cost: {totalCost}</h3>
			<Button variant="contained" color="primary" onClick={() => handleBooking()}>Confirm Booking</Button>
		</FormContainer>
	</Container>
  )
}
export default Booking ;
