import styled from "styled-components";
import { sm } from "../../../../../Breakpoints";

export const ListContainer = styled.div`
  min-width: 17rem;
  background-color: #f4f5f7;
  border-radius: 0.5rem;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${sm({
    minWidth: "13rem",
})}
`;

export const Title = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #172b4d;
  margin-bottom: 0.5rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
