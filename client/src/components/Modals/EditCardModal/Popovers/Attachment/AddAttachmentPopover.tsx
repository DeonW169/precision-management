import React, { useState } from "react";
import { SearchArea, Title } from "../Labels/styled";
import Button from "../../Shared/Button";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { attachmentAdd } from "../../../../../services/cardService";
import { RootState } from "../../../../../redux/store";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: fit-content;
  width: 100%;
  padding-bottom: 0.5rem;
  gap: 0.2rem;
`;

const AddAttachmentPopover: React.FC = () => {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) => state.card);
  const [link, setLink] = useState<string>("");
  const [linkName, setLinkName] = useState<string>("");

  const handleAttachClick = async () => {
    setLink("");
    setLinkName("");
    await attachmentAdd(
      card.cardId,
      card.listId,
      card.boardId,
      /^https?:\/\//.test(link) ? link : "http://" + link,
      linkName,
      dispatch
    );
  };

  return (
    <Container>
      <Title>Attach a link</Title>
      <SearchArea
        placeholder="Paste any link here..."
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      {link && (
        <>
          <Title style={{ marginTop: "0.7rem" }}>Link name (optional)</Title>
          <SearchArea
            value={linkName}
            onChange={(e) => setLinkName(e.target.value)}
          />
        </>
      )}
      <Button
        style={{ marginTop: "1rem" }}
        title="Attach"
        onClick={handleAttachClick} children={undefined}      />
    </Container>
  );
};

export default AddAttachmentPopover;
