import React from "react";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Container,
  RightWrapper,
  Title,
  Row,
  FaviconWrapper,
  AttachmentRightWrapper,
  AttachmentTitleWrapper,
  AttachmentTitle,
  AttachmentTitleIconWrapper,
  AttachmentFooterWrapper,
  AttachmentDate,
  AttachmentOperations,
} from "./styled";

interface Attachment {
  link: string;
  name: string;
  createdAt: string;
}

interface AttachmentsProps {
  attachments: Attachment[];
}

const Attachments: React.FC<AttachmentsProps> = ({ attachments }) => {
  return (
    <Container>
      <InsertLinkIcon />
      <RightWrapper>
        <Title>Attachments</Title>
        {attachments.map((item, index) => (
          <Row key={index}>
            <FaviconWrapper
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InsertLinkIcon />
            </FaviconWrapper>
            <AttachmentRightWrapper>
              <AttachmentTitleWrapper>
                <AttachmentTitle>{item.name}</AttachmentTitle>
                <AttachmentTitleIconWrapper>
                  <MoreHorizIcon />
                </AttachmentTitleIconWrapper>
              </AttachmentTitleWrapper>
              <AttachmentFooterWrapper>
                <AttachmentDate>
                  <span>
                    Added {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <AttachmentOperations>Delete</AttachmentOperations>
                </AttachmentDate>
              </AttachmentFooterWrapper>
            </AttachmentRightWrapper>
          </Row>
        ))}
      </RightWrapper>
    </Container>
  );
};

export default Attachments;
