// import * as React from "react";
// import Modal from "@mui/material/Modal";
// import Actions from "./Actions/Actions";
// import Activity from "./Activity/Activity";
// import AddToCard from "./AddToCard/AddToCard";
// import Checklist from "./Checklist/Checklist";
// import Description from "./Description/Description";
// import Attachments from "./Attachments/Attachments";
// import Features from "./Features/Features";
// import Title from "./Title/Title";
// import CardLoadingSvg from "../../../Images/cardLoading.svg";
// import { getCard } from "../../../Services/cardService";
// import { useSelector, useDispatch } from "react-redux";
// import IconButton from "./ReUsableComponents/IconButton";
// import CoverIcon from "@mui/icons-material/TableChartOutlined";
// import CloseIcon from "@mui/icons-material/Close";
// import {
//   Container,
//   Wrapper,
//   CoverContainer,
//   MainContainer,
//   TitleContainer,
//   FeaturesContainer,
//   DescriptionContainer,
//   ChecklistContainer,
//   ActivityContainer,
//   RightContainer,
//   AddToCardContainer,
//   ActionsContainer,
//   LoadingScreen,
//   AttachmentContainer,
//   CoverButtonWrapper,
//   CloseIconWrapper,
// } from "./styled";
// import { RootState } from "../../../Redux/store";

// interface EditCardProps {
//   open: boolean;
//   callback: () => void;
//   ids: {
//     cardId: string;
//     listId: string;
//     boardId: string;
//   };
// }

// export default function EditCard({ open, callback, ids }: EditCardProps) {
//   const { cardId, listId, boardId } = ids;
//   const dispatch = useDispatch();
//   const thisCard = useSelector((state: RootState) => state.card);

//   React.useEffect(() => {
//     if (open) {
//       getCard(cardId, listId, boardId, dispatch);
//     }
//   }, [cardId, listId, boardId, open, dispatch]);

//   return (
//     <div style={{ position: "relative" }}>
//       <Modal open={open} onClose={callback} style={{ overflow: "auto" }}>
//         <Container>
//           <CoverContainer
//             color={!thisCard.pending ? thisCard.cover.color : undefined}
//           >
//             <CoverButtonWrapper>
//               <IconButton title="Cover" icon={<CoverIcon fontSize="small" />} />
//             </CoverButtonWrapper>
//           </CoverContainer>
//           <TitleContainer>{!thisCard.pending && <Title />}</TitleContainer>
//           <Wrapper>
//             <MainContainer>
//               {!thisCard.pending ? (
//                 <>
//                   {(thisCard.members.length > 0 ||
//                     thisCard.labels.some((label) => label.selected) ||
//                     thisCard.date.startDate ||
//                     thisCard.date.dueDate) && (
//                     <FeaturesContainer>
//                       <Features />
//                     </FeaturesContainer>
//                   )}
//                   <DescriptionContainer>
//                     <Description />
//                   </DescriptionContainer>
//                   {thisCard.attachments.length > 0 && (
//                     <AttachmentContainer>
//                       <Attachments />
//                     </AttachmentContainer>
//                   )}
//                   {thisCard.checklists.length > 0 && (
//                     <ChecklistContainer>
//                       {thisCard.checklists.map((list) => (
//                         <Checklist key={list._id} {...list} />
//                       ))}
//                     </ChecklistContainer>
//                   )}
//                   <ActivityContainer>
//                     <Activity />
//                   </ActivityContainer>
//                 </>
//               ) : (
//                 <LoadingScreen image={CardLoadingSvg} />
//               )}
//             </MainContainer>
//             <RightContainer>
//               <AddToCardContainer>
//                 <AddToCard />
//               </AddToCardContainer>
//               <ActionsContainer>
//                 <Actions />
//               </ActionsContainer>
//             </RightContainer>
//           </Wrapper>
//           <CloseIconWrapper onClick={callback}>
//             <CloseIcon fontSize="small" color="action" />
//           </CloseIconWrapper>
//         </Container>
//       </Modal>
//     </div>
//   );
// }

import React from "react";
import styled from "./styled";
import Title from "./Title/Title";
import Description from "./Description/Description";
import Comment from "./Comment/Comment";
import Checklist from "./Checklist/Checklist";
import Attachments from "./Attachments/Attachments";
import ActivityLog from "./ActivityLog/ActivityLog";
import AddToCard from "./AddToCard/AddToCard";
import Actions from "./Actions/Actions";

interface EditCardProps {
  cardId: string;
  listId: string;
  close: () => void;
}

const Container = styled.Container;
const Main = styled.Main;
const Side = styled.Side;
const Content = styled.Content;
const Section = styled.Section;

const EditCard: React.FC<EditCardProps> = ({ cardId, listId, close }) => {
  return (
    <Container>
      <Title cardId={cardId} listId={listId} />
      <Content>
        <Main>
          <Section>
            <Description cardId={cardId} listId={listId} />
          </Section>
          <Section>
            <Comment cardId={cardId} listId={listId} />
          </Section>
          <Section>
            <Checklist cardId={cardId} listId={listId} />
          </Section>
          <Section>
            <Attachments cardId={cardId} listId={listId} />
          </Section>
          <Section>
            <ActivityLog cardId={cardId} listId={listId} />
          </Section>
        </Main>
        <Side>
          <Section>
            <AddToCard cardId={cardId} listId={listId} />
          </Section>
          <Section>
            <Actions cardId={cardId} listId={listId} close={close} />
          </Section>
        </Side>
      </Content>
    </Container>
  );
};

export default EditCard;
