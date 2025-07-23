import React, { useEffect, FC } from "react";
import ActivityIcon from "@mui/icons-material/MessageOutlined";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import {
  ActionContainer,
  ActionWrapper,
  CommentTitle,
  Text,
  Date,
  CommentArea,
  Container,
  HeadWrapper,
  LoadingBox,
  HeadTitle,
  Wrapper,
} from "./styled";
import moment from "moment";
import { activityUpdate } from "../../../../../services/boardService";
import { RootState } from "../../../../../redux/store";

interface Activity {
  _id: string;
  name: string;
  color: string;
  cardTitle?: string;
  date: string;
  action: string;
  actionType: "comment" | "action";
}

const ActivitySection: FC = () => {
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  useEffect(() => {
    if (board.id) {
      activityUpdate(board.id, dispatch);
    }
  }, [board.id, dispatch]);

  const Comment: FC<Activity> = ({
    name,
    color,
    cardTitle = "",
    date,
    action,
  }) => (
    <ActionContainer>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: color,
          fontSize: "0.875rem",
          fontWeight: "800",
        }}
      >
        {name[0].toUpperCase()}
      </Avatar>
      <ActionWrapper>
        <CommentTitle>
          <Text>
            <b style={{ fontSize: "0.875rem" }}>{name}</b> on {cardTitle}
          </Text>
          <Date>{moment(date).fromNow()}</Date>
        </CommentTitle>
        <CommentArea>{action}</CommentArea>
      </ActionWrapper>
    </ActionContainer>
  );

  const Action: FC<Activity> = ({ name, color, date, action }) => (
    <ActionContainer>
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: color,
          fontSize: "0.875rem",
          fontWeight: "800",
        }}
      >
        {name[0].toUpperCase()}
      </Avatar>
      <ActionWrapper>
        <Text>
          <b style={{ fontSize: "0.875rem" }}>{name}</b> {action}
        </Text>
        <Date>
          {moment(date).calendar().includes("Today")
            ? moment(date).fromNow()
            : moment(date).calendar()}
        </Date>
      </ActionWrapper>
    </ActionContainer>
  );

  return (
    <Container>
      <HeadWrapper>
        <ActivityIcon fontSize="small" />
        <HeadTitle>Activity</HeadTitle>
      </HeadWrapper>
      <Wrapper>
        <>
          {board.activityLoading ? (
            <LoadingBox />
          ) : (
            board?.activity.map((act: any) => {
              act.actionType === "action" ? (
                <Action key={act._id} {...act} />
              ) : (
                <Comment key={act._id} {...act} />
              );
            })
          )}
        </>
      </Wrapper>
    </Container>
  );
};

export default ActivitySection;
