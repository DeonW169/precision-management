import React from "react";
import { Container, Btn } from "./styled";

interface BottomButtonGroupProps {
  handleClose: () => void;
  handleSubmit: () => void;
  title?: string;
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
  title = "btn"
}) => {
  return (
    <Container>
      <Btn type="button" onClick={handleClose}>
        {cancelText || title}
      </Btn>
      <Btn type="submit" onClick={handleSubmit} disabled={isDisabled}>
        {submitText || title}
      </Btn>
    </Container>
  );
};

export default BottomButtonGroup;
