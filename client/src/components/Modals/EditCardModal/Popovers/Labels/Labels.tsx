import React, { useState } from "react";
import Button from "../../ReUsableComponents/Button";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/EditOutlined";
import {
  Container,
  SearchArea,
  Title,
  Row,
  Colorbox,
  ColorText,
  IconWrapper,
  SmallColorsContainer,
  SmallColorBox,
  BlueButton,
  ButtonContainer,
  RedButton,
} from "./styled";
import { useDispatch, useSelector } from "react-redux";
import {
  labelCreate,
  labelDelete,
  labelUpdate,
  labelUpdateSelection,
} from "../../../../../Services/cardService";
import { openAlert } from "../../../../../Redux/Slices/alertSlice";
import { RootState } from "../../../../../Redux/store";

interface LabelsPopoverProps {
  currentPage: "Labels" | "Create" | "Change";
  arrowCallback: (val: boolean) => void;
  titleCallback: (val: string) => void;
}

interface Label {
  _id: string;
  text: string;
  color: string;
  backColor: string;
  selected: boolean;
}

interface Color {
  bg: string;
  hbg: string;
}

const LabelsPopover: React.FC<LabelsPopoverProps> = ({
  currentPage,
  arrowCallback,
  titleCallback,
}) => {
  const dispatch = useDispatch();
  const thisCard = useSelector((state: RootState) => state.card);
  const [selectedCard, setSelectedCard] = useState<Label>({
    _id: "",
    color: "",
    text: "",
    backColor: "",
    selected: false,
  });

  const colors: Color[] = thisCard.colors;

  const handleCreateClick = async (
    text: string,
    color: string,
    backColor: string
  ) => {
    arrowCallback(false);
    titleCallback("Labels");
    await labelCreate(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      text,
      color,
      backColor,
      dispatch
    );
  };

  const handleSaveClick = async (
    labelId: string,
    text: string,
    color: string,
    backColor: string
  ) => {
    arrowCallback(false);
    titleCallback("Labels");
    await labelUpdate(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      labelId,
      { text, color, backColor },
      dispatch
    );
  };

  const handleColorBoxClick = async (labelId: string, selected: boolean) => {
    await labelUpdateSelection(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      labelId,
      selected,
      dispatch
    );
  };

  const handleDeleteClick = async (labelId: string) => {
    arrowCallback(false);
    titleCallback("Labels");
    await labelDelete(
      thisCard.cardId,
      thisCard.listId,
      thisCard.boardId,
      labelId,
      dispatch
    );
  };

  const LabelComponent: React.FC<Label & LabelsPopoverProps> = (props) => (
    <Row>
      <Colorbox
        bg={props.color}
        hbg={props.backColor}
        onClick={() => {
          handleColorBoxClick(props._id, !props.selected);
        }}
      >
        <ColorText>{props.text}</ColorText>
        {props.selected && <DoneIcon fontSize="small" />}
      </Colorbox>
      <IconWrapper
        onClick={() => {
          setSelectedCard({
            _id: props._id,
            color: props.color,
            text: props.text,
            backColor: props.backColor,
            selected: props.selected,
          });
          props.arrowCallback(true);
          props.titleCallback("Change");
        }}
      >
        <EditIcon fontSize="small" />
      </IconWrapper>
    </Row>
  );

  const mainPage = (
    <Container>
      <SearchArea placeholder="Search labels..." />
      <Title>Labels</Title>
      {thisCard.labels.map((label: Label) => (
        <LabelComponent
          key={label._id}
          {...label}
          arrowCallback={arrowCallback}
          titleCallback={titleCallback}
        />
      ))}
      <br />
      <Button
        clickCallback={() => {
          arrowCallback(true);
          titleCallback("Create");
        }}
        title="Create a new label"
      />
    </Container>
  );

  const CreatePage = () => {
    const [createText, setCreateText] = useState("");
    const [createColor, setCreateColor] = useState("#0079bf");
    const [createBackColor, setCreateBackColor] = useState("#055a8c");

    return (
      <Container>
        <Title>Name</Title>
        <SearchArea
          placeholder="Name..."
          value={createText}
          onChange={(e) => setCreateText(e.target.value)}
        />
        <Title>Select a color</Title>
        <SmallColorsContainer>
          {colors.map((color) => (
            <SmallColorBox
              key={color.bg}
              bg={color.bg}
              hbg={color.hbg}
              onClick={() => {
                setCreateColor(color.bg);
                setCreateBackColor(color.hbg);
              }}
            >
              {color.bg === createColor && <DoneIcon fontSize="small" />}
            </SmallColorBox>
          ))}
        </SmallColorsContainer>
        <ButtonContainer>
          <BlueButton
            onClick={() => {
              if (createText && createColor && createBackColor) {
                handleCreateClick(createText, createColor, createBackColor);
              } else {
                dispatch(
                  openAlert({
                    severity: "error",
                    message: "Please fill all required areas!",
                  })
                );
              }
            }}
          >
            Create
          </BlueButton>
        </ButtonContainer>
      </Container>
    );
  };

  const ChangePage = () => {
    const [changeText, setChangeText] = useState(selectedCard.text);
    const [changeColor, setChangeColor] = useState(selectedCard.color);
    const [changeBackColor, setChangeBackColor] = useState(
      selectedCard.backColor
    );

    return (
      <Container>
        <Title>Name</Title>
        <SearchArea
          placeholder="Name..."
          value={changeText}
          onChange={(e) => setChangeText(e.target.value)}
        />
        <Title>Select a color</Title>
        <SmallColorsContainer>
          {colors.map((color) => (
            <SmallColorBox
              key={color.bg}
              bg={color.bg}
              hbg={color.hbg}
              onClick={() => {
                setChangeColor(color.bg);
                setChangeBackColor(color.hbg);
              }}
            >
              {changeColor === color.bg && <DoneIcon fontSize="small" />}
            </SmallColorBox>
          ))}
        </SmallColorsContainer>
        <ButtonContainer>
          <BlueButton
            onClick={() => {
              if (changeText && changeColor && changeBackColor) {
                handleSaveClick(
                  selectedCard._id,
                  changeText,
                  changeColor,
                  changeBackColor
                );
              } else {
                dispatch(
                  openAlert({
                    severity: "error",
                    message: "Please fill all required areas!",
                  })
                );
              }
            }}
          >
            Save
          </BlueButton>
          <RedButton onClick={() => handleDeleteClick(selectedCard._id)}>
            Delete
          </RedButton>
        </ButtonContainer>
      </Container>
    );
  };

  return (
    <>
      {currentPage === "Labels" ? (
        mainPage
      ) : currentPage === "Create" ? (
        <CreatePage />
      ) : (
        <ChangePage />
      )}
    </>
  );
};

export default LabelsPopover;
