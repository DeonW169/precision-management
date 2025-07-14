import styled from "styled-components";

export const BoardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 2rem;
`;

export const BoardCard = styled.div`
  width: 200px;
  height: 120px;
  background-color: #0079bf;
  color: white;
  border-radius: 0.5rem;
  padding: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.03);
  }
`;

export const BoardTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
`;
