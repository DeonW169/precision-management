import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  DescriptionInput,
  DescriptionText,
  RightContainer,
  Title,
} from "./styled";
import {
  updateDescription,
  updateDescriptionOfCard,
} from "../../../Redux/Slices/cardSlice";
import { openAlert } from "../../../Redux/Slices/alertSlice";
import { RootState } from "../../../Redux/store";
import axios from "axios";

interface Props {
  cardId: string;
  listId: string;
  boardId: string;
  description: string;
}

let submitCall = Promise.resolve();

const Description: React.FC<Props> = ({
  cardId,
  listId,
  boardId,
  description,
}) => {
  const [value, setValue] = useState(description || "");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (isInputVisible && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [isInputVisible]);

  const handleBlur = async () => {
    try {
      setIsInputVisible(false);
      if (value !== description) {
        dispatch(updateDescription(value));
        dispatch(
          updateDescriptionOfCard({ listId, cardId, description: value })
        );

        submitCall = submitCall.then(() =>
          axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/board/${boardId}/${listId}/${cardId}/update-description`,
            { description: value },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
        );
        await submitCall;
      }
    } catch (error: any) {
      dispatch(
        openAlert({
          message: error?.response?.data?.errMessage || error.message,
          severity: "error",
        })
      );
    }
  };

  return (
    <Container>
      <Title>Description</Title>
      <RightContainer>
        {!isInputVisible ? (
          <DescriptionText onClick={() => setIsInputVisible(true)}>
            {description || "Add a more detailed description..."}
          </DescriptionText>
        ) : (
          <DescriptionInput
            ref={textAreaRef}
            placeholder="Add a more detailed description..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            minHeight="4rem"
          />
        )}
      </RightContainer>
    </Container>
  );
};

export default Description;
