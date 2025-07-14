import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addList } from "../../../../Redux/Slices/listSlice";
import {
  Container,
  AddBtn,
  Input,
  ButtonGroup,
  AddListBtn,
  CancelBtn,
} from "./styled";

const AddList: React.FC<{ boardId: string }> = ({ boardId }) => {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    if (!title) return;
    dispatch(addList({ title, boardId }));
    setIsAdding(false);
    setTitle("");
  };

  return (
    <Container>
      {!isAdding ? (
        <AddBtn onClick={() => setIsAdding(true)}>+ Add another list</AddBtn>
      ) : (
        <>
          <Input
            autoFocus
            placeholder="Enter list title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <ButtonGroup>
            <AddListBtn onClick={handleAdd}>Add list</AddListBtn>
            <CancelBtn onClick={() => setIsAdding(false)}>X</CancelBtn>
          </ButtonGroup>
        </>
      )}
    </Container>
  );
};

export default AddList;
