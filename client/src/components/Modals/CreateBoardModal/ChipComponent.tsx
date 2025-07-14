import React from "react";
import { Chip } from "@mui/material";

interface ChipComponentProps {
  label: string;
  color: string;
  onDelete?: () => void;
}

const ChipComponent: React.FC<ChipComponentProps> = ({
  label,
  color,
  onDelete,
}) => {
  return (
    <Chip
      label={label}
      style={{
        backgroundColor: color,
        color: "white",
        fontWeight: 600,
        fontSize: "0.8rem",
        height: "1.75rem",
      }}
      onDelete={onDelete}
    />
  );
};

export default ChipComponent;
