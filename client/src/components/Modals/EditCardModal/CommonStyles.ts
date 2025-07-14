import styled from 'styled-components';

export const Title = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #42526e;
  padding: 0.5rem 0rem;
`;

export const ItemBox = styled.div`
  font-size: 0.9rem;
  padding: 0.4rem 0rem;
  cursor: pointer;
  font-weight: 400;
  color: #5e6c84;
  display: flex;
  justify-content: space-between;

  &:hover {
    color: #172b4d;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`;

export const Label = styled.label`
  font-weight: 400;
  font-size: 0.85rem;
  color: #5e6c84;
`;

export const Value = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #42526e;
`;

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #e0e0e0;
  margin: 0.5rem 0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
