import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const ButtonWrapper = styled.button`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
  }
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
`;

export const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #172b4d;
`;

export const DescriptionText = styled.span`
  font-size: 12px;
  color: #5e6c84;
  margin-top: 2px;
`;