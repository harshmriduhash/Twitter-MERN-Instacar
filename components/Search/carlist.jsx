import React from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { Card, GridContainer, Price } from './styles';


const Carlist = ( { handleBooking, cost } ) => {
	const price = cost ? (cost * 300): null;
	return (
		<div>
			<Card>
				<GridContainer>
					<div>
						<img src="/search_page_car_img.png" width="80px" height="80px"/>
					</div>
					<div>
						<h3>Vechile</h3>
						<Price>Maruti Suzuki</Price>
					</div>
					<div>
						<h3>Price</h3>
						<Price>{price }</Price>
					</div>
					<div>
						<Link href="/booking-payment"><Button variant="contained" color="primary" onClick={handleBooking}>Book Now</Button></Link>
					</div>
				</GridContainer>
				<div className="footer">
					<GridContainer>
						<Button color="primary">Terms & Services</Button>
						<Button color="primary">Fare Details</Button>
					</GridContainer>
				</div>
			</Card>
		</div>
	)
}
export default Carlist;
