import React from "react";
import { Container, Icon, Text } from "./styled";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LabelIcon from "@mui/icons-material/Label";
import ChecklistIcon from "@mui/icons-material/Checklist";
import AttachmentIcon from "@mui/icons-material/Attachment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CoverIcon from "@mui/icons-material/Wallpaper";

interface FeatureProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const Feature: React.FC<FeatureProps> = ({ text, icon, onClick }) => (
  <Container onClick={onClick}>
    <Icon>{icon}</Icon>
    <Text>{text}</Text>
  </Container>
);

interface FeaturesProps {
  handleOpenPopover: (type: string) => void;
}

const Features: React.FC<FeaturesProps> = ({ handleOpenPopover }) => {
  return (
    <>
      <Feature
        text="Members"
        icon={<PersonAddAlt1Icon />}
        onClick={() => handleOpenPopover("members")}
      />
      <Feature
        text="Labels"
        icon={<LabelIcon />}
        onClick={() => handleOpenPopover("labels")}
      />
      <Feature
        text="Checklist"
        icon={<ChecklistIcon />}
        onClick={() => handleOpenPopover("checklist")}
      />
      <Feature
        text="Dates"
        icon={<CalendarMonthIcon />}
        onClick={() => handleOpenPopover("date")}
      />
      <Feature
        text="Attachment"
        icon={<AttachmentIcon />}
        onClick={() => handleOpenPopover("attachment")}
      />
      <Feature
        text="Cover"
        icon={<CoverIcon />}
        onClick={() => handleOpenPopover("cover")}
      />
    </>
  );
};

export default Features;
