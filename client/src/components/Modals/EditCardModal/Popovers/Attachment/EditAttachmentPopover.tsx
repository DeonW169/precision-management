import React, { useState } from "react";
import { SearchArea, Title, BlueButton } from "../Labels/styled";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { attachmentUpdate } from "../../../../../Services/cardService";
import { RootState } from "../../../../../Redux/store";

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

interface EditAttachmentPopoverProps {
  _id: string;
  link: string;
  name?: string;
  closeCallback: () => void;
}

const EditAttachmentPopover: React.FC<EditAttachmentPopoverProps> = ({
  _id,
  link: initialLink,
  name,
  closeCallback,
}) => {
  const dispatch = useDispatch();
  const card = useSelector((state: RootState) => state.card);
  const [link, setLink] = useState<string>(initialLink);
  const [linkName, setLinkName] = useState<string>(name ?? initialLink);

  const handleAttachClick = async () => {
    closeCallback();
    await attachmentUpdate(
      card.cardId,
      card.listId,
      card.boardId,
      _id,
      /^https?:\/\//.test(link) ? link : "http://" + link,
      linkName,
      dispatch
    );
  };

  return (
    <Container>
      <Title>Link</Title>
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
      <BlueButton style={{ marginTop: "1rem" }} onClick={handleAttachClick}>
        Update
      </BlueButton>
    </Container>
  );
};

export default EditAttachmentPopover;
