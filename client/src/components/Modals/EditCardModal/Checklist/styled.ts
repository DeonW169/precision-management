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

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LeftColumn = styled.div`
  display: flex;
  align-items: center;
`;

export const RightColumn = styled.div`
  display: flex;
  gap: 10px;
`;

export const Title = styled.div`
  font-weight: 500;
`;

export const Percentage = styled.div`
  margin-left: 8px;
`;

export const CheckText = styled.div`
  font-size: 14px;
  margin-left: 10px;
`;

export const RowRightButtonsWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const TextAreaContainer = styled.div`
  margin-top: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 6px;
  font-size: 14px;
  resize: none;
  outline: none;
  background: #f4f5f7;
`;