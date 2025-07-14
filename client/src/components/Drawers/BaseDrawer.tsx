import React, { useEffect, useState, ReactNode } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import {
  Container,
  HeadContainer,
  BackIconWrapper,
  Title,
  CloseIconWrapper,
  Hr,
  ContentWrapper,
} from "./styled";

interface BaseDrawerProps {
  show: boolean;
  title: string;
  content: ReactNode;
  showBackIcon?: boolean;
  backClickCallback?: () => void;
  closeCallback: (value: boolean) => void;
}

const BaseDrawer: React.FC<BaseDrawerProps> = ({
  show,
  title,
  content,
  showBackIcon = false,
  backClickCallback,
  closeCallback,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (show) setOpen(true);
  }, [show]);

  const toggleDrawer =
    (value: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === "keydown") return;
      setOpen(value);
      closeCallback(value);
    };

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 320 }}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
        bgcolor="#f4f5f7"
        height="100vh"
      >
        <Container>
          <HeadContainer>
            <BackIconWrapper
              style={{ visibility: showBackIcon ? "visible" : "hidden" }}
              onClick={backClickCallback}
            >
              <BackIcon fontSize="small" />
            </BackIconWrapper>
            <Title>{title}</Title>
            <CloseIconWrapper
              onClick={() => {
                setOpen(false);
                closeCallback(false);
              }}
            >
              <CloseIcon fontSize="small" />
            </CloseIconWrapper>
          </HeadContainer>
          <Hr />
          <ContentWrapper>{content}</ContentWrapper>
        </Container>
      </Box>
    </Drawer>
  );
};

export default BaseDrawer;
