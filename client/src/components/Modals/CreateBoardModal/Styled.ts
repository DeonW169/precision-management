import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	width: 100%;
	max-width: 30rem;
	padding: 2rem;
	background-color: white;
	border-radius: 0.5rem;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Section = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Title = styled.h2`
	font-size: 1.5rem;
	font-weight: 600;
	color: #172b4d;
	margin-bottom: 1rem;
`;

export const Row = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.75rem;
`;

export const ScrollableRow = styled.div`
	display: flex;
	overflow-x: auto;
	gap: 1rem;
	padding-bottom: 0.5rem;

	&::-webkit-scrollbar {
		height: 6px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 3px;
	}
`;

export const SubmitButton = styled.button`
	padding: 0.5rem 1rem;
	background-color: #0079bf;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-weight: 500;

	&:hover {
		background-color: #026aa7;
	}
`;

export const InputLabel = styled.label`
	font-size: 0.875rem;
	color: #5e6c84;
`;
