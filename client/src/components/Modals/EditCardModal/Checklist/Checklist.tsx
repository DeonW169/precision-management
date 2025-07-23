import React, { useState } from "react";
import {
  Container,
  Row,
  LeftColumn,
  RightColumn,
  Title,
  Percentage,
  CheckText,
  RowRightButtonsWrapper,
  IconWrapper,
  TextAreaContainer,
  TextArea,
} from "./styled";
import CheckIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import BottomButtonGroup from "../../../Pages/BoardPage/BoardComponents/BottomButtonGroup/BottomButtonGroup";
import Checkbox from "../Shared/Checkbox";
import Button from "../Shared/Button";
import Progressbar from "../Shared/Progressbar";
import { useDispatch, useSelector } from "react-redux";
import {
  checklistDelete,
  checklistItemAdd,
  checklistItemCompletedSet,
  checklistItemDelete,
  checklistItemTextSet,
} from "../../../../services/cardService";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import { AppDispatch, RootState } from "../../../../redux/store";

interface ChecklistItemType {
  _id: string;
  text: string;
  completed: boolean;
}

interface ChecklistProps {
  _id: string;
  title: string;
  items: ChecklistItemType[];
}

const Checklist: React.FC<ChecklistProps> = ({ _id, title, items }) => {
  const dispatch = useDispatch<AppDispatch>();
  const card = useSelector((state: RootState) => state.card);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [hideItems, setHideItems] = useState(false);

  const percentage = () => {
    if (items.length === 0) return 0;
    const completed = items.filter((item) => item.completed);
    return Math.round(
      100 - ((items.length - completed.length) / items.length) * 100
    );
  };

  const handleChecklistDelete = async (checklistId: string) => {
    await checklistDelete(
      card.cardId,
      card.listId,
      card.boardId,
      checklistId,
      dispatch
    );
  };

  const handleAddChecklistItem = async (checklistId: string) => {
    setShowAddItem(false);
    await checklistItemAdd(
      card.cardId,
      card.listId,
      card.boardId,
      checklistId,
      newItem,
      dispatch
    );
    setNewItem("");
  };

  const ChecklistItem: React.FC<
    ChecklistItemType & { checklistId: string }
  > = ({ _id, text, completed, checklistId }) => {
    const [checked] = useState(completed);
    const [showEdit, setShowEdit] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleChecklistItemDeleteClick = async () => {
      await checklistItemDelete(
        card.cardId,
        card.listId,
        card.boardId,
        checklistId,
        _id,
        dispatch
      );
    };

    const handleCompletedChange = async () => {
      await checklistItemCompletedSet(
        card.cardId,
        card.listId,
        card.boardId,
        checklistId,
        _id,
        !checked,
        dispatch
      );
    };

    const handleTextChange = async () => {
      await checklistItemTextSet(
        card.cardId,
        card.listId,
        card.boardId,
        checklistId,
        _id,
        editedText,
        dispatch
      );
    };

    return (
      // <Row showHover={true}>
      <Row>
        <LeftColumn>
          <Checkbox checked={checked} onChange={handleCompletedChange} />
        </LeftColumn>
        <RightColumn>
          {showEdit ? (
            <TextAreaContainer>
              <TextArea
                value={editedText}
                onChange={(e: any) => setEditedText(e.target.value)}
              />
              <BottomButtonGroup
                title="Save"
                // clickCallback={handleTextChange}
                handleSubmit={() => setShowEdit(false)}
                handleClose={function (): void {
                  throw new Error("Function not implemented.");
                }}
              />
            </TextAreaContainer>
          ) : (
            <>
              {/* <CheckText onClick={() => setShowEdit(true)} isChecked={checked}> */}
              <CheckText onClick={() => setShowEdit(true)}>{text}</CheckText>
              <IconWrapper onClick={handleChecklistItemDeleteClick}>
                <DeleteIcon fontSize="small" />
              </IconWrapper>
            </>
          )}
        </RightColumn>
      </Row>
    );
  };

  return (
    <Container>
      <Row>
        <LeftColumn>
          <CheckIcon fontSize="small" />
        </LeftColumn>
        {/* <RightColumn makeColumn={true}> */}
        <RightColumn>
          <Title>{title}</Title>
          <RowRightButtonsWrapper>
            <Button
              onClick={() => setHideItems((prev) => !prev)}
              title={hideItems ? "Show checked" : "Hide checked"}
              children={undefined}
            />
            <Button
              onClick={() => handleChecklistDelete(_id)}
              title="Delete"
              children={undefined}
            />
          </RowRightButtonsWrapper>
        </RightColumn>
      </Row>
      <Row>
        <LeftColumn>
          <Percentage>{percentage()}%</Percentage>
        </LeftColumn>
        <RightColumn>
          <Progressbar progress={percentage()} />
        </RightColumn>
      </Row>

      {items.map((item) =>
        hideItems && item.completed ? null : (
          <ChecklistItem key={item._id} checklistId={_id} {...item} />
        )
      )}

      <Row>
        <LeftColumn></LeftColumn>
        <RightColumn>
          {showAddItem ? (
            <TextAreaContainer>
              <TextArea
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="Add an item"
              />
              <BottomButtonGroup
                title="Add"
                handleSubmit={() => handleAddChecklistItem(_id)}
                handleClose={() => setShowAddItem(false)}
              />
            </TextAreaContainer>
          ) : (
            <Button
              onClick={() => setShowAddItem(true)}
              title="Add an item"
              children={undefined}
            />
          )}
        </RightColumn>
      </Row>
    </Container>
  );
};

export default Checklist;
