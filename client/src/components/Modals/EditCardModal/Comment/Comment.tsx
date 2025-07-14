import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomButtonGroup from "../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup";
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  CommentWrapper,
  ButtonContainer,
  CommentArea,
  LinkContainer,
  Link,
} from "./styled";
import { commentDelete, commentUpdate } from "../../../../Services/cardService";
import { Avatar } from "@mui/material";
import { RootState } from "../../../../Redux/store"; // adjust if your store is in a different location

interface CommentProps {
  _id: string;
  text: string;
  userName: string;
  color: string;
}

const Comment: React.FC<CommentProps> = ({ _id, text, userName, color }) => {
  const [edit, setEdit] = useState(true);
  const [comment, setComment] = useState(text);
  const user = useSelector((state: RootState) => state.user.userInfo);
  const card = useSelector((state: RootState) => state.card);
  const dispatch = useDispatch();

  const handleSaveClick = async () => {
    setEdit(true);
    await commentUpdate(
      card.cardId,
      card.listId,
      card.boardId,
      comment,
      _id,
      dispatch
    );
  };

  const handleDeleteClick = async () => {
    await commentDelete(card.cardId, card.listId, card.boardId, _id, dispatch);
  };

  return (
    <Container>
      <LeftContainer>
        <Avatar
          sx={{
            width: 28,
            height: 28,
            bgcolor: color,
            fontSize: "0.875rem",
            fontWeight: "800",
          }}
        >
          {userName[0].toUpperCase()}
        </Avatar>
      </LeftContainer>
      <RightContainer>
        <Title>{userName}</Title>
        <CommentWrapper>
          <CommentArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            readOnly={edit}
          />
          <ButtonContainer show={!edit}>
            <BottomButtonGroup
              title="Save"
              clickCallback={handleSaveClick}
              closeCallback={() => setEdit(true)}
            />
          </ButtonContainer>
          <LinkContainer show={edit && user.name === userName}>
            <Link onClick={() => setEdit(false)}>Edit</Link>
            <Link onClick={handleDeleteClick}>Delete</Link>
          </LinkContainer>
        </CommentWrapper>
      </RightContainer>
    </Container>
  );
};

export default Comment;
