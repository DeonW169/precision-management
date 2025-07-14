import React from "react";
import { CheckboxContainer, HiddenCheckbox, StyledCheckbox } from "./styled";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  color?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  className,
  color,
}) => {
  return (
    <CheckboxContainer className={className}>
      <HiddenCheckbox checked={checked} onChange={onChange} />
      <StyledCheckbox checked={checked} color={color} />
    </CheckboxContainer>
  );
};

export default Checkbox;
