import React from "react";
import { Container, Btn } from "./styled";

interface BottomButtonGroupProps {
  handleClose: () => void;
  handleSubmit: () => void;
  isDisabled?: boolean;
  cancelText?: string;
  submitText?: string;
}

const BottomButtonGroup: React.FC<BottomButtonGroupProps> = ({
  handleClose,
  handleSubmit,
  isDisabled = false,
  cancelText = "Cancel",
  submitText = "Submit",
}) => {
  return (
    <Container>
      <Btn type="button" onClick={handleClose}>
        {cancelText}
      </Btn>
      <Btn type="submit" onClick={handleSubmit} disabled={isDisabled}>
        {submitText}
      </Btn>
    </Container>
  );
};

export default BottomButtonGroup;
