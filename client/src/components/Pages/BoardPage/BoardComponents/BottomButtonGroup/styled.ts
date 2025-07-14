import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 1rem;
`;

export const Btn = styled.button`
  border: none;
  border-radius: 5px;
  padding: 0.3rem 0.8rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  background-color: #0065ff;
  transition: all 0.3s ease;

  &:hover {
    background-color: #004fcc;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
