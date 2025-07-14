import * as React from "react";
import {
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
} from "../../ReUsableComponents/BasePopover";
import { DateDiv, CustomDateRange } from "./styled";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../Popovers/Date/DateRange.css";
import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { updateStartDueDatesOfCard } from "../../../Redux/Slices/listSlice";
import { RootState } from "../../../Redux/store";

export default function DatePopover() {
  const dispatch = useDispatch();
  const startDate = useSelector(
    (state: RootState) => state.card.cardData.date.startDate
  );
  const dueDate = useSelector(
    (state: RootState) => state.card.cardData.date.dueDate
  );
  const cardId = useSelector((state: RootState) => state.card.cardData._id);

  const selectionRange = {
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: dueDate ? new Date(dueDate) : new Date(),
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    dispatch(
      updateStartDueDatesOfCard({ startDate, dueDate: endDate, cardId })
    );
  };

  return (
    <>
      <PopoverHeader>Date</PopoverHeader>
      <PopoverDescription>
        Set a due date or date range to track card completion.
      </PopoverDescription>
      <PopoverContent>
        <DateDiv>
          <CustomDateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            rangeColors={["#1894ed"]}
          />
        </DateDiv>
      </PopoverContent>
    </>
  );
}
