import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import List from "./BoardComponents/List/List";
import AddList from "./BoardComponents/AddList/AddList";
import TopBar from "./BoardComponents/TopBar/TopBar";
import BottomButtonGroup from "./BoardComponents/BottomButtonGroup/BottomButtonGroup";
import { successFetchingBoard } from "../../../redux/slices/boardSlice";
import { Container, ListContainer } from "./styled";
import { RootState } from "../../../redux/store";

const Board: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useDispatch();
  const board = useSelector((state: RootState) => state.board);
  const bgImage = board.backgroundImageLink;
  const isImage = board.isImage;

  useEffect(() => {
    if (boardId) {
      const payload = {};
      dispatch(successFetchingBoard(payload));
    }
  }, [dispatch, boardId]);

  return (
    <Container>
      <TopBar
        title={""}
        onAddCard={function (): void {
          throw new Error("Function not implemented.");
        }}
        onOpenSettings={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <ListContainer>
        {board.lists.map((list) => (
          <List
            key={list._id}
            list={{
              _id: "",
              title: "",
              cards: [],
            }}
            index={0}
          />
        ))}
        <AddList boardId={""} />
      </ListContainer>
      <BottomButtonGroup
        handleClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        handleSubmit={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </Container>
  );
};

export default Board;
