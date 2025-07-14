import styled from "styled-components";

export const CardContainer = styled.div`
  background-color: #ffffff;
  color: #000000;
  padding: 0.5rem;
  border-radius: 3px;
  margin-bottom: 0.5rem;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f4f5f7;
  }
`;
