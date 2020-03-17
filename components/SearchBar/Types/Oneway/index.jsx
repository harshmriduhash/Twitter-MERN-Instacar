import React, { useRef } from 'react';
import { Container } from './styles';
import { Input, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const Oneway = ( { setState  } ) => {
	const originRef = useRef();
	const destinationRef = useRef();
	const departDateRef = useRef(); 
	const router = useRouter();

	const isRegistered = useSelector(state => state.isRegistered);
	const dispatch = useDispatch();
	
	
	const handleSubmit = () => {
		const origin = 'Bangalore';
		const destination = destinationRef.current.value;
		const departDate = departDateRef.current.value;
		const data = { origin, destination, departDate };
		if ((destination.length || departDate.length ) == 0 ){
			alert('Please Enter the required field');
			return
		}
		dispatch({ type: 'ADD_SEARCH_DATA', payload: data })
		if(isRegistered) {
			router.push({
				pathname: '/login',
			});
		}
		router.push({
			pathname: '/register',
		});
	};
	return (
		<Container>
			<Input placeholder="Select Origin" type="city" value="Bangalore" inputRef={originRef} />
			<Input placeholder="Select Destination" inputRef={destinationRef} />
			<Input placeholder="Enter date" type="date" inputRef={departDateRef} />
			<Input placeholder="Enter return date" type="date" disabled onClick={() => setState('roundtrip')}/>
			<Button variant="contained" color="primary" onClick={handleSubmit}>Book Now</Button>
		</Container>
  )
}
export default Oneway ;
