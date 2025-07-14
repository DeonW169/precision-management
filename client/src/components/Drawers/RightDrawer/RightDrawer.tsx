import React, { useEffect, useState } from "react";
import BaseDrawer from "../BaseDrawer";
import AboutMenu from "./AboutMenu/AboutMenu";
import MainMenu from "./MainMenu/MainMenu";
import BackgroundMenu from "./BackgroundMenu/BackgroundMenu";

interface RightDrawerProps {
  show: boolean;
  closeCallback: () => void;
}

const RightDrawer: React.FC<RightDrawerProps> = ({
  show: showProp,
  closeCallback,
}) => {
  const [show, setShow] = useState(false);
  const [sectionName, setSectionName] = useState<
    "Menu" | "About this board" | "Change background"
  >("Menu");

  useEffect(() => {
    if (showProp) setShow(true);
  }, [showProp]);

  const handleBackClick = () => {
    if (
      sectionName === "About this board" ||
      sectionName === "Change background"
    ) {
      setSectionName("Menu");
    } else {
      setSectionName("Change background");
    }
  };

  return (
    <BaseDrawer
      title={sectionName}
      show={show}
      closeCallback={(param: boolean) => {
        setShow(param);
        closeCallback();
      }}
      backClickCallback={handleBackClick}
      showBackIcon={sectionName !== "Menu"}
      content={
        sectionName === "Menu" ? (
          <MainMenu menuCallback={setSectionName} />
        ) : sectionName === "About this board" ? (
          <AboutMenu />
        ) : (
          <BackgroundMenu
            menuCallback={setSectionName}
            sectionName={sectionName}
          />
        )
      }
    />
  );
};

export default RightDrawer;
