import styled from 'styled-components';

export const Container = styled.div`
  width: 272px;
  background-color: #ffffff3d;
  padding: 8px;
  border-radius: 3px;
`;

export const AddBtn = styled.div`
  color: white;
  cursor: pointer;
  padding: 6px;
  font-weight: 500;
  &:hover {
    background-color: #ffffff3f;
  }
`;

export const Input = styled.textarea`
  resize: none;
  width: 100%;
  min-height: 40px;
  padding: 8px;
  border: none;
  border-radius: 3px;
  font-size: 0.875rem;
  font-family: inherit;
  outline: none;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

export const AddListBtn = styled.button`
  background-color: #0079bf;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 3px;
  font-size: 0.875rem;
  cursor: pointer;
  margin-right: 8px;
  &:hover {
    background-color: #026aa7;
  }
`;

export const CancelBtn = styled.div`
  font-size: 1.25rem;
  color: white;
  cursor: pointer;
  user-select: none;
`;
