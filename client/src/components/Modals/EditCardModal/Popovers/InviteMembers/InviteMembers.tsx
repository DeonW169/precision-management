import React, { useState } from "react";
import { Container, SearchContainer, SearchBar, ChipContainer } from "./styled";
import Button from "../../Shared/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@mui/styles";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { useDispatch, useSelector } from "react-redux";
// import { getUserFromEmail } from "../../../../../services/userService";
import { openAlert } from "../../../../../redux/slices/alertSlice";
import { boardMemberAdd } from "../../../../../services/boardService";
import { RootState } from "../../../../../redux/store";

interface Member {
  name: string;
  surname: string;
  email: string;
}

const useStyles = makeStyles({
  root: {
    maxWidth: "8rem",
    opacity: "70%",
  },
});

const ChipComponent: React.FC<{
  name: string;
  surname: string;
  email: string;
  callback: (email: string) => void;
}> = ({ name, surname, email, callback }) => {
  const classes = useStyles();
  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={`${name} ${surname}`}
      placement="top"
      arrow
    >
      <Chip
        className={classes.root}
        onDelete={() => callback(email)}
        avatar={<Avatar>{name[0]}</Avatar>}
        label={name}
        size="small"
        color="secondary"
      />
    </Tooltip>
  );
};

const InviteMembers: React.FC = () => {
  const [memberMail, setMemberMail] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const dispatch = useDispatch();
  const boardMembers = useSelector((state: RootState) => state.board.members);
  const boardId = useSelector((state: RootState) => state.board.id);

  const handleAddClick = async () => {
    const checkMember = boardMembers.find((m) => m.email === memberMail);
    if (checkMember) {
      dispatch(
        openAlert({
          message: `${checkMember.name} is already member of this board!`,
          severity: "error",
        })
      );
      setMemberMail("");
      return;
    }

    // const result = await getUserFromEmail(memberMail, dispatch);
    // if (!result) return;
    // setMembers((prev) => [...prev, result]);
    // setMemberMail("");
  };

  const handleDelete = (email: string) => {
    const newMembers = members.filter((member) => member.email !== email);
    setMembers(newMembers);
  };

  const handleInviteClick = async () => {
    await boardMemberAdd(boardId, members, dispatch);
  };

  return (
    <Container>
      <SearchContainer>
        <SearchBar
          type="email"
          placeholder="Member's Email"
          value={memberMail}
          onChange={(e) => setMemberMail(e.target.value)}
        />
        <Button
          title="Add"
          style={{ flex: "1" }}
          children={undefined}
          // clickCallback={handleAddClick}
        />
      </SearchContainer>
      <ChipContainer>
        {members.map((member) => (
          <ChipComponent
            key={member.email}
            callback={handleDelete}
            {...member}
          />
        ))}
      </ChipContainer>
      {members.length > 0 && (
        // <Button clickCallback={handleInviteClick} title="Invite" />
        <Button children={undefined} title="Invite" />
      )}
    </Container>
  );
};

export default InviteMembers;
