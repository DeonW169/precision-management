import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.3rem;
`;

export const ItemBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	gap: 0.5rem;
	width: 100%;
	padding: 0.25rem 0;
`;

export const CheckInput = styled.input`
	width: 1rem;
	height: 1rem;
	cursor: pointer;
`;

export const Text = styled.span<{ completed: boolean }>`
	text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
	color: ${({ completed }) => (completed ? '#bdbdbd' : 'inherit')};
	font-size: 0.9rem;
	flex: 1;
`;

export const DeleteButton = styled.button`
	background-color: transparent;
	border: none;
	color: #888;
	cursor: pointer;
	font-size: 0.8rem;

	&:hover {
		color: #f44336;
	}
`;

export const InputBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
`;

export const Input = styled.input`
	flex: 1;
	padding: 0.4rem;
	font-size: 0.9rem;
	border-radius: 4px;
	border: 1px solid #ccc;
`;

export const AddButton = styled.button`
	padding: 0.4rem 1rem;
	font-size: 0.9rem;
	background-color: #0065ff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #0952cc;
	}
`;
