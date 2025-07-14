import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  height: 100vh;
  box-sizing: border-box;
  overflow-y: auto;
`;

export const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0rem 0.5rem;
  height: 2rem;
  box-sizing: border-box;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const BackIconWrapper = styled.div`
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  &:hover {
    background-color: #e4e6ea;
  }
`;

export const CloseIconWrapper = styled.div`
  cursor: pointer;
  padding: 0.2rem;
  border-radius: 4px;
  &:hover {
    background-color: #e4e6ea;
  }
`;

export const Hr = styled.hr`
  margin: 0.5rem 0;
  border: none;
  height: 1px;
  background-color: #dfe1e6;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
