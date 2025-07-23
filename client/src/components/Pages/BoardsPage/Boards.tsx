import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startFetchingBoards } from "../../../redux/slices/boardsSlice";
import { BoardsContainer, BoardCard, BoardTitle } from "./styled";
import { useNavigate } from "react-router-dom";

const Boards: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const boards = useSelector((state: any) => state.boards.boards);

  useEffect(() => {
    dispatch(startFetchingBoards());
  }, [dispatch]);

  return (
    <BoardsContainer>
      {boards?.map((board: any) => (
        <BoardCard
          key={board._id}
          onClick={() => navigate(`/board/${board._id}`)}
        >
          <BoardTitle>{board.title}</BoardTitle>
        </BoardCard>
      ))}
    </BoardsContainer>
  );
};

export default Boards;
