import React from "react";
import MenuButton from "./MenuButton";
import { MainContainer } from "./styled";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../../../redux/slices/drawerSlice";
import { AppDispatch, RootState } from "../../../../redux/store";

interface MainMenuProps {
  menuCallback?: (section: "About this board" | "Change background" | "Menu") => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ menuCallback }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cardSelected = useSelector((state: RootState) => state.card.selected);

  const handleOpenDrawer = (type: string) => {
    dispatch(openDrawer(type));
  };

  return (
    <MainContainer>
      <MenuButton
        clickCallback={() => handleOpenDrawer("about")}
        icon={<InfoOutlinedIcon />}
        title="About this card"
        description="Add a description, attachments, and more."
      />
      <MenuButton
        clickCallback={() => handleOpenDrawer("background")}
        icon={<FormatColorFillOutlinedIcon />}
        title="Change background"
        description="Change the background of the board."
      />
      <MenuButton
        clickCallback={() => handleOpenDrawer("copy")}
        icon={<ContentCopyIcon />}
        title="Copy"
        description="Create a copy of this card."
      />
      {/* <MenuButton
        clickCallback={() => handleOpenDrawer("archive")}
        icon={<ArchiveOutlinedIcon />}
        title={cardSelected?.archived ? "Send to board" : "Archive"}
        description={
          cardSelected?.archived
            ? "Move the card back to the board."
            : "Archive this card."
        }
      /> */}
    </MainContainer>
  );
};

export default MainMenu;
