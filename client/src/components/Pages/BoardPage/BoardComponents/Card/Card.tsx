import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
// import { openModal } from "../../../redux/slices/modalSlice";
import { CardContainer } from "./styled";

interface Label {
  text: string;
  color: string;
  backColor: string;
  selected: boolean;
}

interface Member {
  user: string;
  name: string;
  color: string;
}

interface CardProps {
  title: string;
  index: number;
  cardId: string;
  listId: string;
  boardId: string;
  labels: Label[];
  members: Member[];
}

const Card: React.FC<CardProps> = ({
  title,
  index,
  cardId,
  listId,
  boardId,
  labels,
  members,
}) => {
  const dispatch = useDispatch();

  const handleOpen = () => {
    // dispatch(
      // openModal({
      //   type: "cardDetail",
      //   cardId,
      //   listId,
      //   boardId,
      // })
    // );
  };

  return (
    <Draggable draggableId={cardId} index={index}>
      {(provided) => (
        <CardContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={handleOpen}
        >
          {title}
        </CardContainer>
      )}
    </Draggable>
  );
};

export default Card;
