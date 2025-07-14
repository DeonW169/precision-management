import React from "react";
import { ProgressContainer, ProgressFiller } from "./styled";

interface ProgressbarProps {
  progress: number;
}

const Progressbar: React.FC<ProgressbarProps> = ({ progress }) => {
  return (
    <ProgressContainer>
      <ProgressFiller style={{ width: `${progress}%` }} />
    </ProgressContainer>
  );
};

export default Progressbar;
