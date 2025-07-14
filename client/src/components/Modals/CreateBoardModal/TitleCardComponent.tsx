import React from "react";
import styled from "styled-components";
import { Box, Typography } from "@mui/material";

const TitleInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 1.25rem;
  font-weight: bold;
  background: transparent;
  color: #172b4d;
  padding: 0.5rem 0;

  &::placeholder {
    color: #b5bac0;
  }
`;

interface TitleCardComponentProps {
  title: string;
  setTitle: (title: string) => void;
}

const TitleCardComponent: React.FC<TitleCardComponentProps> = ({
  title,
  setTitle,
}) => {
  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Board Title
      </Typography>
      <TitleInput
        type="text"
        placeholder="Enter board title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </Box>
  );
};

export default TitleCardComponent;
