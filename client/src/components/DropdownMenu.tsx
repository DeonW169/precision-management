import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { styled as muiStyled } from "@mui/material/styles";
import DownIcon from "@mui/icons-material/KeyboardArrowDown";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getBoards } from "../services/boardsService";
import CardLoadingSvg from "../Images/cardLoading.svg";
import { RootState } from "../redux/store"; // Adjust if you have a different store file

interface DropdownMenuProps {
  title: string;
}

const BootstrapButton = muiStyled(Button)({
  boxShadow: "none",
  textTransform: "none",
  gap: "0.25rem",
  padding: "0.25rem 0.5rem",
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-around",

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  "&:active": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});

const LoadingBox = styled.div<{ image: string }>`
  height: 3rem;
  width: 8rem;
  padding: 0.5rem 3rem;
  background-image: url(${(props) => props.image});
  background-position: center;
  background-repeat: no-repeat;
`;

const Span = styled.span`
  font-size: 0.85rem;
  display: block;
`;

const StyledIcon = muiStyled(DownIcon)({
  display: "block",
  fontSize: "1.3rem",
});

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title }) => {
  const boardsData = useSelector((state: RootState) => state.boards.boardsData);
  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [loading, setLoading] = React.useState(false);
  const open = Boolean(anchorEl);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setLoading(true);
    await getBoards(true, dispatch);
    setLoading(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <BootstrapButton
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Span>{title}</Span>
        <Span>
          <StyledIcon />
        </Span>
      </BootstrapButton>

      {Object.keys(boardsData).length > 0 && (
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {!loading ? (
            boardsData.map((item: { _id: string; title: string }) => (
              <MenuItem
                key={item._id}
                onClick={() => {
                  setAnchorEl(null);
                  history.push("/board/" + item._id);
                }}
              >
                <Span>{item.title}</Span>
              </MenuItem>
            ))
          ) : (
            <LoadingBox image={CardLoadingSvg} />
          )}
        </Menu>
      )}
    </div>
  );
};

export default DropdownMenu;
