import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Overlay,
  OverlayBackground,
  PopoverContent,
  CloseIcon,
} from "./styled";
import { RxCross2 } from "react-icons/rx";
// import { closePopover } from "../../../../redux/slices/boardSlice";

interface BasePopoverProps {
  children: React.ReactNode;
  top?: string;
  right?: string;
  width?: string;
  zIndex?: number;
  anchorElement: HTMLElement | null;
  closeCallback: () => void;
  title: string;
  contents: React.ReactElement;
}

const BasePopover: React.FC<BasePopoverProps> = ({
  children,
  top,
  right,
  width,
  zIndex,
  anchorElement,
  closeCallback,
  title,
  contents,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        // dispatch(closePopover());
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [dispatch]);

  return (
    <Overlay>
      <OverlayBackground />
      <PopoverContent
        ref={popoverRef}
        // top={top}
        // right={right}
        // width={width}
        // zIndex={zIndex}
      >
        <CloseIcon >
          <RxCross2 />
        </CloseIcon>
        {children}
      </PopoverContent>
    </Overlay>
  );
};

export default BasePopover;
