import React, { useState } from "react";
import {
  Container,
  Title,
  SearchArea,
  ButtonContainer,
  BlueButton,
} from "../Labels/styled";
import { useDispatch, useSelector } from "react-redux";
import { checklistCreate } from "../../../../../services/cardService";
import { RootState, AppDispatch } from "../../../../../redux/store";

interface ChecklistPopoverProps {
  closeCallback: () => void;
}

const ChecklistPopover: React.FC<ChecklistPopoverProps> = ({
  closeCallback,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const thisCard = useSelector((state: RootState) => state.card);
  const [title, setTitle] = useState<string>("");

  const handleAddClick = async () => {
    closeCallback();
    await checklistCreate(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      title,
      dispatch
    );
  };

  return (
    <Container>
      <Title>Title</Title>
      <SearchArea
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <ButtonContainer>
        <BlueButton style={{ width: "4rem" }} onClick={handleAddClick}>
          Add
        </BlueButton>
      </ButtonContainer>
    </Container>
  );
};

export default ChecklistPopover;
