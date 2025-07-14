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
import Checkbox from "../ReUsableComponents/Checkbox";
import Button from "../ReUsableComponents/Button";
import Progressbar from "../ReUsableComponents/Progressbar";
import { useDispatch, useSelector } from "react-redux";
import {
  checklistDelete,
  checklistItemAdd,
  checklistItemCompletedSet,
  checklistItemDelete,
  checklistItemTextSet,
} from "../../../../Services/cardService";
import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";
import { AppDispatch, RootState } from "../../../../Redux/store";

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
      <Row showHover={true}>
        <LeftColumn>
          <Checkbox checked={checked} clickCallback={handleCompletedChange} />
        </LeftColumn>
        <RightColumn>
          {showEdit ? (
            <TextAreaContainer>
              <TextArea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <BottomButtonGroup
                title="Save"
                clickCallback={handleTextChange}
                closeCallback={() => {
                  setShowEdit(false);
                }}
              />
            </TextAreaContainer>
          ) : (
            <>
              <CheckText onClick={() => setShowEdit(true)} isChecked={checked}>
                {text}
              </CheckText>
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
        <RightColumn makeColumn={true}>
          <Title>{title}</Title>
          <RowRightButtonsWrapper>
            <Button
              clickCallback={() => setHideItems((prev) => !prev)}
              title={hideItems ? "Show checkeds" : "Hide checkeds"}
            />
            <Button
              clickCallback={() => handleChecklistDelete(_id)}
              title="Delete"
            />
          </RowRightButtonsWrapper>
        </RightColumn>
      </Row>
      <Row>
        <LeftColumn>
          <Percentage>{percentage()}%</Percentage>
        </LeftColumn>
        <RightColumn>
          <Progressbar value={percentage()} />
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
                clickCallback={() => handleAddChecklistItem(_id)}
                closeCallback={() => setShowAddItem(false)}
              />
            </TextAreaContainer>
          ) : (
            <Button
              clickCallback={() => setShowAddItem(true)}
              title="Add an item"
            />
          )}
        </RightColumn>
      </Row>
    </Container>
  );
};

export default Checklist;
