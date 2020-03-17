import React, { useState } from 'react';
import Link from 'next/link';
import { Container,Card, GridContainer } from './styles';
import { Button } from '@material-ui/core';
import { data } from './data';
import Carlist from './carlist';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter  } from 'next/router';

const Search = ( ) => {
	const serverUrl = 'https://localhost:3001'; 

	const router = useRouter();
	const [ driver, setDriver ] = useState(' ');
	const [ language, setLanguage ] = useState( ' ');
	const [ cost, setCost ] = useState();
	const dispatch = useDispatch();
	const handleBooking = () => {
		dispatch({ type: 'ADD_FILTER', payload: { driver, language, cost }})
		router.push({
			pathname: '/booking-payment',
		});
	}
	const searchData = useSelector(state => state.searchData);
	return (
		<Container>
				<div className="filterBox">
					<h3>Select Driver </h3>
						{
							data.map(item => {
								return (
									<div>
										<input 
											type="radio" 
											value={item.driverName}
											onChange={(e) => setDriver( e.target.value ) } 
											name="driverNameRadio" />{item.driverName}
									</div>
								)
							})
						}
						<hr />
					<h3>Select price</h3>
					{
						data.map(item => {
							return (
								<div>
									<input
										type="radio"
										value={item.cost}
										name="cost"
										onChange={(e) => setCost(e.target.value)} />
									{`${item.cost}/Km`}
								</div>
							)
						})
					}
					<hr />
					<h3>Select Language</h3>
						{
							data.map(item => {
								return (
									<div>
										<input 
											type="radio" 
											value={item.spokenLanguage} 
											name="languageRadio" 
											onChange={(e) => setLanguage( e.target.value )} />
											{item.spokenLanguage}
									</div>
								)
							})
						}
						
				</div>
				<div>
					<Card>
						<h4>Booking Details</h4>
						<GridContainer>
							<div>
								<h4>Origin </h4>
								<p>{searchData.origin}</p>
							</div>
							<div>
								<h4>Destination</h4>
								<p>{searchData.destination}</p>
							</div>
							<div>
								<div>
									<h4>Depart Date</h4>
									<p>{searchData.departDate}</p>
								</div>
							</div>
						</GridContainer>
					</Card><br /><br />
					<Carlist handleBooking={handleBooking} cost={cost} />
				</div>
		</Container>
	 )
}
export default Search ;
