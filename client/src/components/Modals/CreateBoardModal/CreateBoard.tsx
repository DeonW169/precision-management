import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import styled from "styled-components";
import PhotoCardComponent from "./PhotoCardComponent";
import TitleCardComponent from "./TitleCardComponent";
import ChipComponent from "./ChipComponent";
import { useDispatch } from "react-redux";
import { createBoard } from "../../Redux/Slices/boardsSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ModalContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  width: 90%;
  max-width: 500px;
  margin: auto;
`;

interface CreateBoardProps {
  open: boolean;
  onClose: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ open, onClose }) => {
  const [title, setTitle] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#0079bf");
  const [customColor, setCustomColor] = useState("");
  const [chipColors, setChipColors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const predefinedColors = [
    "#0079bf",
    "#d29034",
    "#519839",
    "#b04632",
    "#89609e",
  ];

  const handleAddCustomColor = () => {
    if (customColor && !chipColors.includes(customColor)) {
      setChipColors([...chipColors, customColor]);
      setCustomColor("");
    }
  };

  const handleDeleteChip = (color: string) => {
    setChipColors(chipColors.filter((c) => c !== color));
  };

  const handleCreate = () => {
    const newBoard = {
      _id: uuidv4(),
      title,
      backgroundColor,
    };
    dispatch(createBoard(newBoard));
    onClose();
    navigate(`/board/${newBoard._id}`);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ModalContainer>
          <Typography variant="h6" gutterBottom>
            Create New Board
          </Typography>
          <TitleCardComponent title={title} setTitle={setTitle} />
          <PhotoCardComponent
            predefinedColors={predefinedColors}
            backgroundColor={backgroundColor}
            setBackgroundColor={setBackgroundColor}
          />
          <Box mt={2} width="100%">
            <Typography variant="subtitle2">Custom Colors</Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              {chipColors.map((color) => (
                <ChipComponent
                  key={color}
                  label={color}
                  color={color}
                  onDelete={() => handleDeleteChip(color)}
                />
              ))}
            </Box>
            <Box display="flex" mt={1} gap={1}>
              <TextField
                variant="outlined"
                size="small"
                label="Add Color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
              />
              <Button variant="contained" onClick={handleAddCustomColor}>
                Add
              </Button>
            </Box>
          </Box>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              disabled={!title}
            >
              Create Board
            </Button>
          </Box>
        </ModalContainer>
      </Fade>
    </Modal>
  );
};

export default CreateBoard;
