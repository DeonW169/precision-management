import React, { ReactNode } from "react";
import {
  ButtonWrapper,
  IconWrapper,
  TextWrapper,
  Title,
  DescriptionText,
} from "./styled";

interface MenuButtonProps {
  clickCallback: () => void;
  icon: ReactNode;
  title: string;
  description: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({
  clickCallback,
  icon,
  title,
  description,
}) => {
  return (
    <ButtonWrapper onClick={clickCallback}>
      <IconWrapper>{icon}</IconWrapper>
      <TextWrapper>
        <Title>{title}</Title>
        <DescriptionText>{description}</DescriptionText>
      </TextWrapper>
    </ButtonWrapper>
  );
};

export default MenuButton;
