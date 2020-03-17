import styled from 'styled-components';

export const Container = styled.div`
	margin: auto;
	width: 70%;
	text-align: center;
	position: relative;
	top: 10px;
	display: flex;
	justify-content: space-evenly;
	.filterBox {
		width: 200px;
		padding: 10px;
		border-radius: 8px;
		border: 0.5px solid grey;
		background: #f1f1f1;
		box-shadow: 10px 10px 4px #eaeaea;
	}
	input {
		width: 20px;
		height: 20px;
	}
	div {
		align-align: center;
	}
`;

export const Card = styled.div`
	padding: 10px;
	width: 600px;
	border-radius: 8px;
	border: 0.5px solid grey;
	background: #f1f1f1;
	box-shadow: 10px 10px 4px #eaeaea;
	.footer {
		background: white;
		button {
			margin: 8px;
		};
		width: 100%;
		padding: 0px;
		
		border-radius: 8px;
	}
`;
export const GridContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	.vl {
		width: 0px;
		height: 30px;
	}
`;
export const Price = styled.p`
	font-size: 18px;
	font-weight: bold;
`;

