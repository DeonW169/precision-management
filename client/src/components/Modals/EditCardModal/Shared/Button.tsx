import React from "react";
import styled from 'styled-components';
// import { StyledButton } from "./styled";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: string;
  height?: string;
  fontSize?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBgColor?: string;
  borderRadius?: string;
  padding?: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width || "auto"};
  height: ${({ height }) => height || "auto"};
  font-size: ${({ fontSize }) => fontSize || "14px"};
  background-color: ${({ bgColor }) => bgColor || "#007bff"};
  color: ${({ textColor }) => textColor || "#fff"};
  border: 1px solid ${({ borderColor }) => borderColor || "#007bff"};
  border-radius: ${({ borderRadius }) => borderRadius || "4px"};
  padding: ${({ padding }) => padding || "8px 12px"};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ hoverBgColor }) => hoverBgColor || "#0056b3"};
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  width,
  height,
  fontSize,
  bgColor,
  textColor,
  borderColor,
  hoverBgColor,
  borderRadius,
  padding,
  ...rest
}) => {
  return (
    <StyledButton
      width={width}
      height={height}
      fontSize={fontSize}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
      hoverBgColor={hoverBgColor}
      borderRadius={borderRadius}
      padding={padding}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
