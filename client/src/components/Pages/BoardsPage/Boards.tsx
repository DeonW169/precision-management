import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../Redux/Slices/boardsSlice";
import { BoardsContainer, BoardCard, BoardTitle } from "./Styled";
import { useHistory } from "react-router-dom";

const Boards: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const boards = useSelector((state: any) => state.boards.boards);

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);

  return (
    <BoardsContainer>
      {boards.map((board: any) => (
        <BoardCard
          key={board._id}
          onClick={() => history.push(`/board/${board._id}`)}
        >
          <BoardTitle>{board.title}</BoardTitle>
        </BoardCard>
      ))}
    </BoardsContainer>
  );
};

export default Boards;
