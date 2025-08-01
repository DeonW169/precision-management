import React, { useEffect, useState } from "react";
import {
  Container,
  IconWrapper,
  RightContainer,
  TitleInput,
  Description,
  Link,
} from "./styled";
import TitleIcon from "@mui/icons-material/ChromeReaderMode";
import { titleUpdate } from "../../../../services/cardService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";

const Title: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector((state: RootState) => state.card);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    setTitle(card.title);
  }, [card.title]);

  const handleTitleAccept = async () => {
    await titleUpdate(card.cardId, card.listId, card.boardId, title, dispatch);
  };

  return (
    <Container>
      <IconWrapper>
        <TitleIcon fontSize="small" />
      </IconWrapper>
      <RightContainer>
        <TitleInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleTitleAccept}
        />
        <Description>
          in list <Link>{card.listTitle}</Link>
        </Description>
      </RightContainer>
    </Container>
  );
};

export default Title;
