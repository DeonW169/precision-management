import React from "react";
import { Container, Title } from "./styled";
import IconButton from "../Shared/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { cardDelete } from "../../../../services/listService";
import { RootState } from "../../../../redux/store";

const Actions: React.FC = () => {
  const card = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch();

  return (
    <Container>
      <Title>Actions</Title>
      <IconButton
        onClick={(card: any) => {
          cardDelete(card.listId, card.boardId, card.cardId, dispatch);
        }}
        title="Delete"
        icon={<DeleteIcon fontSize="small" />}
      />
    </Container>
  );
};

export default Actions;
