import styled from "styled-components";
import { lg } from "../../BreakPoints";

export const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  z-index: 100;

  ${lg({
    justifyContent: "space-between",
})}
`;

export const Icon = styled.img`
  margin-left: 1rem;
  ${lg({
    marginLeft: "0",
})}
`;

export const RightSide = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const Link = styled.a`
  text-decoration: underline;
  cursor: pointer;
  color: #0952cc;
`;

export const Button = styled.button`
  background-color: #0065ff;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0952cc;
  }
`;
