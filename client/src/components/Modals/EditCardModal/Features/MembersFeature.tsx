import React from "react";
import { Avatar, Box } from "./styled";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";

interface MembersFeatureProps {
  handleOpenPopover: (type: string) => void;
}

const MembersFeature: React.FC<MembersFeatureProps> = ({
  handleOpenPopover,
}) => {
  const card = useSelector((state: RootState) => state.card.card);

  return (
    <Box>
      {card.members?.map((item, index) => (
        <Avatar key={index} style={{ backgroundColor: item.color }}>
          {item.name?.[0]?.toUpperCase()}
        </Avatar>
      ))}
      <Avatar
        style={{ backgroundColor: "#DFE1E6" }}
        onClick={() => handleOpenPopover("members")}
      >
        <AddIcon style={{ color: "#172b4d" }} />
      </Avatar>
    </Box>
  );
};

export default MembersFeature;
