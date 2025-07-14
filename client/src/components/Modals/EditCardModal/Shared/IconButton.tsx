import React from "react";
import { IconButtonContainer } from "./styled";

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <IconButtonContainer
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </IconButtonContainer>
  );
};

export default IconButton;
