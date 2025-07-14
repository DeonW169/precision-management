import React from "react";
import { StyledButton } from "./styled";

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
