import * as React from "react";
// import {
//   PopoverContent,
//   PopoverDescription,
//   PopoverHeader,
// } from "../../Shared/BasePopover";

import { DateDiv, CustomDateRange, PopoverHeader, PopoverDescription, PopoverContent } from "./styled";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "../../Popovers/Date/DateRange.css";
// import { DateRange } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { updateStartDueDatesOfCard } from "../../../../../redux/slices/listSlice";
import { RootState } from "../../../../../redux/store";

export default function DatePopover() {
  const dispatch = useDispatch();
  const startDate = useSelector(
    (state: RootState) => state.card.date.startDate
  );
  const dueDate = useSelector(
    (state: RootState) => state.card.date.dueDate
  );
  const dueTime = useSelector(
    (state: RootState) => state.card.date.dueTime
  );
  const cardId = useSelector((state: RootState) => state.card.cardId);
  const listId = useSelector((state: RootState) => state.card.listId);

  const selectionRange = {
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: dueDate ? new Date(dueDate) : new Date(),
    key: "selection",
  };

  const handleSelect = (ranges: any) => {
    const { startDate, endDate } = ranges.selection;
    dispatch(
      updateStartDueDatesOfCard({ listId, cardId, startDate, dueDate, dueTime })
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
