import { Avatar } from "@mui/material";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import {
  Container,
  LeftContainer,
  RightContainer,
  LogWrapper,
  Title,
  Date,
} from "./styled";

interface Activity {
  isComment: boolean;
  color: string;
  userName: string;
  text: string;
  date: string;
}

const ActivityLog: React.FC = () => {
  const card = useSelector((state: RootState) => state.card);

  return (
    <>
      {card.activities.map((activity: Activity, index: number) => {
        if (!activity.isComment)
          return (
            <Container key={index}>
              <LeftContainer>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    bgcolor: activity.color,
                    fontSize: "0.875rem",
                    fontWeight: "800",
                  }}
                >
                  {activity.userName[0].toUpperCase()}
                </Avatar>
              </LeftContainer>
              <RightContainer>
                <LogWrapper>
                  <Title>{activity.userName}</Title> {activity.text}
                </LogWrapper>
                <Date>
                  {moment(activity.date).format("MMMM Do YYYY, h:mm:ss a")}
                </Date>
              </RightContainer>
            </Container>
          );
        return null;
      })}
    </>
  );
};

export default ActivityLog;
