import React from "react";
import { TopBarContainer, BoardTitle, BoardActions } from "./styled";
import Button from "../../../../Components/Shared/Button";

interface TopBarProps {
  title: string;
  onAddCard: () => void;
  onOpenSettings: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  onAddCard,
  onOpenSettings,
}) => {
  return (
    <TopBarContainer>
      <BoardTitle>{title}</BoardTitle>
      <BoardActions>
        <Button text="Add Card" onClick={onAddCard} />
        <Button text="Settings" onClick={onOpenSettings} />
      </BoardActions>
    </TopBarContainer>
  );
};

export default TopBar;
