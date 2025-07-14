import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const ColorCard = styled.div<{ $isSelected: boolean; $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin: 5px;
  cursor: pointer;
  background-color: ${(props) => props.$color};
  border: ${(props) =>
    props.$isSelected ? "3px solid black" : "1px solid #ccc"};
  transition: border 0.3s;
`;

interface PhotoCardComponentProps {
  predefinedColors: string[];
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

const PhotoCardComponent: React.FC<PhotoCardComponentProps> = ({
  predefinedColors,
  backgroundColor,
  setBackgroundColor,
}) => {
  return (
    <Box mt={2}>
      <Typography variant="subtitle2">Select Background</Typography>
      <Box display="flex" flexWrap="wrap">
        {predefinedColors.map((color) => (
          <ColorCard
            key={color}
            $color={color}
            $isSelected={color === backgroundColor}
            onClick={() => setBackgroundColor(color)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default PhotoCardComponent;
