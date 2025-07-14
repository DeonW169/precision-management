import React, { useEffect, useState } from "react";
import {
  Container,
  SubContainer,
  Image,
  Title,
  PhotosContainer,
  PhotosWrapper,
} from "./styled";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { boardBackgroundUpdate } from "../../../../Services/boardService";
import { RootState } from "../../../../Redux/store"; // Adjust path to your store definition

type Props = {
  sectionName: string;
  menuCallback: (section: string) => void;
};

const getImages = async () => {
  const newAxios = axios.create();
  delete newAxios.defaults.headers.common["Authorization"];
  const res = await newAxios.get(
    "https://trello.com/proxy/unsplash/collections/317099/photos?per_page=30&order_by=latest&page=4"
  );
  return res.data;
};

const DefaultMenu: React.FC<Props & { dispatch: any; boardId: string }> = ({
  menuCallback,
}) => {
  return (
    <Container>
      <SubContainer onClick={() => menuCallback("Photos by Unsplash")}>
        <Image link="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg" />
        <Title>Photos</Title>
      </SubContainer>
      <SubContainer onClick={() => menuCallback("Colors")}>
        <Image link="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg" />
        <Title>Colors</Title>
      </SubContainer>
    </Container>
  );
};

const PhotosMenu: React.FC<Props & { dispatch: any; boardId: string }> = ({
  dispatch,
  boardId,
}) => {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    getImages().then((res) => {
      setTimeout(() => {
        setImages(res);
      }, 2000);
    });
  }, []);

  const handleClick = (background: string) => {
    boardBackgroundUpdate(boardId, background, true, dispatch);
  };

  return (
    <PhotosContainer>
      {images.length > 0
        ? images.map((image) => (
            <PhotosWrapper
              key={image.id}
              onClick={() => handleClick(image.urls.full)}
            >
              <Image key={image.id} link={image.urls.small} />
            </PhotosWrapper>
          ))
        : [...Array(18).keys()].map((_, i) => (
            <PhotosWrapper key={i}>
              <Skeleton variant="rectangular" width="100%" height="6rem" />
            </PhotosWrapper>
          ))}
    </PhotosContainer>
  );
};

const ColorsMenu: React.FC<Props & { dispatch: any; boardId: string }> = ({
  dispatch,
  boardId,
}) => {
  const colors = [
    "#0079bf",
    "#d29034",
    "#519839",
    "#b04632",
    "#89609e",
    "#cd5a91",
    "#4bbf6b",
    "#00aecc",
  ];

  const handleClick = (background: string) => {
    boardBackgroundUpdate(boardId, background, false, dispatch);
  };

  return (
    <PhotosContainer>
      {colors.map((color) => (
        <PhotosWrapper key={color} onClick={() => handleClick(color)}>
          <Image key={color} bg={color} />
        </PhotosWrapper>
      ))}
    </PhotosContainer>
  );
};

const BackgroundMenu: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const boardId = useSelector((state: RootState) => state.board.id);

  return (
    <>
      {props.sectionName === "Change background" ? (
        <DefaultMenu {...props} dispatch={dispatch} boardId={boardId} />
      ) : props.sectionName === "Photos by Unsplash" ? (
        <PhotosMenu {...props} dispatch={dispatch} boardId={boardId} />
      ) : (
        <ColorsMenu {...props} dispatch={dispatch} boardId={boardId} />
      )}
    </>
  );
};

export default BackgroundMenu;
