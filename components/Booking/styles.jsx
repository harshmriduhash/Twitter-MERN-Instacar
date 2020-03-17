import styled from 'styled-components';

export const Container = styled.div`
	width: 600px;
	margin: auto;
	background: #f1f1f1;
	text-align: left;
	box-shadow: 10px 10px 4px #eaeaea;
	border-radius: 8px;
	p {
		font-weight: bold;
		font-size: 24px;
		padding: 10px;
	};
	padding: 20px;
`;


export const FormContainer = styled.div`
	width: 60%;
	margin: auto;
`;

export const GridContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	input {
		margin: 10px;
	}
`;
