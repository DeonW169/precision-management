import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import List from "./BoardComponents/List/List";
import AddList from "./BoardComponents/AddList/AddList";
import TopBar from "./BoardComponents/TopBar/TopBar";
import BottomButtonGroup from "./BoardComponents/BottomButtonGroup/BottomButtonGroup";
import { fetchSingleBoard } from "../../Redux/Slices/boardSlice";
import { Container, ListContainer } from "./Styled";
import { useAppSelector } from "../../Redux/store";

const Board: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const dispatch = useDispatch();
  const board = useAppSelector((state) => state.board);
  const bgImage = board.backgroundImage;
  const isImage = board.isImage;

  useEffect(() => {
    if (boardId) {
      dispatch(fetchSingleBoard(boardId));
    }
  }, [dispatch, boardId]);

  return (
    <Container bgImage={bgImage} isImage={isImage}>
      <TopBar />
      <ListContainer>
        {board.lists.map((list) => (
          <List key={list._id} list={list} />
        ))}
        <AddList />
      </ListContainer>
      <BottomButtonGroup />
    </Container>
  );
};

export default Board;
