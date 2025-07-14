import React from "react";
import { Container, Title } from "./styled";
import Button from "../ReUsableComponents/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete } from "../../../../Services/listService";
import { RootState } from "../../../../Redux/store"; // Adjust the import path to your store setup

const Actions: React.FC = () => {
  const card = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch();

  return (
    <Container>
      <Title>Actions</Title>
      <Button
        clickCallback={() => {
          cardDelete(card.listId, card.boardId, card.cardId, dispatch);
        }}
        title="Delete"
        icon={<DeleteIcon fontSize="small" />}
      />
    </Container>
  );
};

export default Actions;
