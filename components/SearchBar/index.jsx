import React, { useState } from 'react';
import { Container, Header, GridContainer } from './styles';
import { Input, Button } from '@material-ui/core';
import { Airport, Oneway, RoundTrip } from './Types';

const SearchBar = () => {
	const [ state, setState ] = useState('oneway');
return (
	<Container>
			<Header><h2>Choose the plan</h2></Header>
			<GridContainer>
				<Button onClick={() => setState('oneway')}>One way</Button>
				<Button onClick={() => setState('roundtrip')}>Round Trip</Button>
				<Button onClick={() => setState('airport')}>Airport</Button>
			</GridContainer>
			{state === 'oneway' ? <Oneway state={state} setState={setState}/>: null}
			{state === 'roundtrip ' ? <RoundTrip />: null }
			{state === 'airport' ? <Airport />: null}
	</Container>
  )
}
export default SearchBar ;
