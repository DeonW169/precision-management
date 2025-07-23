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

export const Wrapper = styled.div`
  display: flex;
  width: 25.25rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5rem;
`;

export const PhotosCard = styled.div`
  width: 100%;
  min-height: 96px;
  max-width: 18.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
`;

export const CreateButton = styled.button`
  width: 35%;
  font-weight: 500;
  padding: 0.4rem;
  border: none;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: #2099df;
  transition: 100ms linear;
  -webkit-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  -moz-box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  box-shadow: rgba(0, 0, 0, 0.3) 0 1px 3px;
  &:hover {
    background-color: #1089cf;
  }
  &:active {
    background-color: #0079bf;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: rgba(128, 128, 128, 1);
    color: rgba(200, 200, 200, 0.5);
  }
`;