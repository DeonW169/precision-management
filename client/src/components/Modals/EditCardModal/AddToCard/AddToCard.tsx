import React, { useState, MouseEvent } from "react";
import { Container, Title } from "./styled";
import Button from "../Shared/IconButton";
import MemberIcon from "@mui/icons-material/PersonOutlineOutlined";
import LabelIcon from "@mui/icons-material/LabelOutlined";
import CheckIcon from "@mui/icons-material/LibraryAddCheckOutlined";
import DateIcon from "@mui/icons-material/ScheduleOutlined";
import AttachmentIcon from "@mui/icons-material/AttachFileOutlined";
import CoverIcon from "@mui/icons-material/TableChartOutlined";
import BasePopover from "../Shared/BasePopover";
import MembersPopover from "../Popovers/Members/MembersPopover";
import LabelsPopover from "../Popovers/Labels/Labels";
import ChecklistPopover from "../Popovers/Checklist/ChecklistPopover";
import DatePopover from "../Popovers/Date/DatePopover";
import AddAttachmentPopover from "../Popovers/Attachment/AddAttachmentPopover";
import CoverPopover from "../Popovers/Cover/CoverPopover";

const AddToCard: React.FC = () => {
  const [memberPopover, setMemberPopover] = useState<null | HTMLElement>(null);
  const [labelPopover, setLabelPopover] = useState<null | HTMLElement>(null);
  const [checklistPopover, setChecklistPopover] = useState<null | HTMLElement>(
    null
  );
  const [datePopover, setDatePopover] = useState<null | HTMLElement>(null);
  const [attachmentPopover, setAttachmentPopover] =
    useState<null | HTMLElement>(null);
  const [coverPopover, setCoverPopover] = useState<null | HTMLElement>(null);

  const [labelsBackArrow, setLabelsBackArrow] = useState<boolean>(false);
  const [labelsTitle, setLabelsTitle] = useState<string>("Labels");
  const [selectedPopover, setSelectedPopover] = useState<
    "Labels" | "Create" | "Change"
  >("Labels");

  return (
    <Container>
      <Title>Add to card</Title>

      <Button
        onClick={(event: MouseEvent<HTMLElement>) =>
          setMemberPopover(event.currentTarget)
        }
        title="Members"
        icon={<MemberIcon fontSize="small" />}
      />
      {memberPopover && (
        <BasePopover
          anchorElement={memberPopover}
          closeCallback={() => setMemberPopover(null)}
          title="Members"
          contents={<MembersPopover />}
          children={undefined}
        />
      )}

      <Button
        onClick={(event: MouseEvent<HTMLElement>) =>
          setLabelPopover(event.currentTarget)
        }
        title="Labels"
        icon={<LabelIcon fontSize="small" />}
      />
      {labelPopover && (
        <BasePopover
          anchorElement={labelPopover}
          closeCallback={() => {
            setLabelPopover(null);
            setLabelsTitle("Labels");
            setSelectedPopover("Labels");
            setLabelsBackArrow(false);
          }}
          title={labelsTitle}
          contents={
            <LabelsPopover
              currentPage={selectedPopover}
              titleCallback={(event: string) => setLabelsTitle(event)}
              arrowCallback={(event: boolean) => setLabelsBackArrow(event)}
            />
          }
          children={undefined}
        />
      )}

      <Button
        onClick={(event: MouseEvent<HTMLElement>) =>
          setChecklistPopover(event.currentTarget)
        }
        title="Checklist"
        icon={<CheckIcon fontSize="small" />}
      />
      {checklistPopover && (
        <BasePopover
          anchorElement={checklistPopover}
          closeCallback={() => setChecklistPopover(null)}
          title="Checklist"
          contents={
            <ChecklistPopover closeCallback={() => setChecklistPopover(null)} />
          }
          children={undefined}
        />
      )}

      <Button
        onClick={(event: MouseEvent<HTMLElement>) =>
          setDatePopover(event.currentTarget)
        }
        title="Dates"
        icon={<DateIcon fontSize="small" />}
      />
      {datePopover && (
        <BasePopover
          anchorElement={datePopover}
          closeCallback={() => setDatePopover(null)}
          title="Date"
          // contents={<DatePopover closeCallback={() => setDatePopover(null)} />}
          contents={<DatePopover />}
          children={undefined}
        />
      )}

      <Button
        onClick={(event: MouseEvent<HTMLElement>) =>
          setAttachmentPopover(event.currentTarget)
        }
        title="Attachment"
        icon={<AttachmentIcon fontSize="small" />}
      />
      {attachmentPopover && (
        <BasePopover
          anchorElement={attachmentPopover}
          closeCallback={() => setAttachmentPopover(null)}
          title="Attach from..."
          contents={
            // <AddAttachmentPopover handleAttachClick={() => setAttachmentPopover(null)} />
            <AddAttachmentPopover />
          }
          children={undefined}
        />
      )}

      <Button
        title="Cover"
        onClick={(event: MouseEvent<HTMLElement>) =>
          setCoverPopover(event.currentTarget)
        }
        icon={<CoverIcon fontSize="small" />}
      />
      {coverPopover && (
        <BasePopover
          anchorElement={coverPopover}
          closeCallback={() => setCoverPopover(null)}
          title="Cover"
          contents={
            // <CoverPopover closeCallback={() => setCoverPopover(null)} />
            <CoverPopover
              selectedSizeType={0}
              selectedColor={""}
              onSelectSizeType={function (type: number): void {
                throw new Error("Function not implemented.");
              }}
              onSelectColor={function (color: string): void {
                throw new Error("Function not implemented.");
              }}
            />
          }
          children={undefined}
        />
      )}
    </Container>
  );
};

export default AddToCard;
