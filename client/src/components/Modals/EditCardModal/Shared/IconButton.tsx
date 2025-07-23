import React from "react";
import { IconButtonContainer } from "./styled";

interface IconButtonProps {
  // children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  title?: string;
  icon?: any;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  title,
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
      {title}
    </IconButtonContainer>
  );
};

export default IconButton;