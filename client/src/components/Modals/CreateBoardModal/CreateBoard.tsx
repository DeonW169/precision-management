import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import * as style from "./styled";

import PhotoCardComponent from "./PhotoCardComponent";
import TitleCardComponent from "./TitleCardComponent";
import { useDispatch, useSelector } from "react-redux";
import { createBoard } from "../../../services/boardsService";
import LoadingScreen from "../../LoadingScreen";
import { AppDispatch, RootState } from "../../../redux/store";

interface CreateBoardProps {
  callback: () => void;
}

interface Board {
  [key: string]: any;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ callback }) => {
  const dispatch = useDispatch<AppDispatch>();
  const creating = useSelector((state: RootState) => state.boards.creating);
  const { backgroundImages, smallPostfix } = useSelector(
    (state: RootState) => state.boards
  );

  const [open, setOpen] = useState(true);
  const [background, setBackground] = useState<string>(
    backgroundImages[0] + smallPostfix
  );

  let newBoard: any = {};

  const handleClick = async () => {
    await createBoard(newBoard, dispatch);
    callback();
    setBackground(backgroundImages[0] + smallPostfix);
  };

  const handleSelect = (link: string) => {
    setBackground(link);
  };

  const handleClose = () => {
    setOpen(false);
    callback();
  };

  const handleUpdate = (updatedBoard: Board) => {
    newBoard = { ...updatedBoard };
  };

  return (
    <div style={{ position: "relative" }}>
      {creating && <LoadingScreen />}
      <Modal open={open} onClose={handleClose} disableEnforceFocus>
        <style.Container>
          <style.Wrapper>
            <TitleCardComponent
              title={""}
              setTitle={function (title: string): void {
                throw new Error("Function not implemented.");
              }} // link={background}
              // updateback={handleUpdate}
              // callback={handleClose}
            />
            <style.PhotosCard>
              {backgroundImages.map((item: string, index: number) => (
                <PhotoCardComponent
                  key={index}
                  predefinedColors={[]}
                  backgroundColor={""}
                  setBackgroundColor={function (color: string): void {
                    throw new Error("Function not implemented.");
                  }} // $color={background}
                  // link={item + smallPostfix}
                  // callback={handleSelect}
                />
              ))}
            </style.PhotosCard>
          </style.Wrapper>
          <style.CreateButton onClick={handleClick}>
            Create Board
          </style.CreateButton>
        </style.Container>
      </Modal>
    </div>
  );
};

export default CreateBoard;
