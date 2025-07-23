import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListContainer, Title, CardsContainer } from "./styled";
import Card from "../Card/Card";

interface CardItem {
  _id: string;
  title: string;
  description: string;
  labels: any[];
  members: any[];
  watchers: any[];
  date: any;
}

interface ListProps {
  list: {
    _id: string;
    title: string;
    cards: CardItem[];
  };
  index: number;
}

const List: React.FC<ListProps> = ({ list }) => {
  return (
    <Droppable droppableId={list._id}>
      {(provided) => (
        <ListContainer ref={provided.innerRef} {...provided.droppableProps}>
          <Title>{list.title}</Title>
          <CardsContainer>
            {list.cards.map((card, index) => (
              <Card key={card._id} index={index} title={""} cardId={""} listId={""} boardId={""} labels={[]} members={[]} />
            ))}
            {provided.placeholder}
          </CardsContainer>
        </ListContainer>
      )}
    </Droppable>
  );
};

export default List;
