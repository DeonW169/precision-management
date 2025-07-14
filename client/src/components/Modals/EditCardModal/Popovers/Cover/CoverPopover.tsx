import React from "react";
import styled from "styled-components";
import SizeTypeOne from "./SizeTypeOne";
import SizeTypeTwo from "./SizeTypeTwo";

interface CoverPopoverProps {
  selectedSizeType: number;
  selectedColor: string;
  onSelectSizeType: (type: number) => void;
  onSelectColor: (color: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ColorOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ColorBox = styled.div<{ color: string; selected: boolean }>`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.color};
  border: ${(props) =>
    props.selected ? "3px solid #0079bf" : "1px solid #ccc"};
  cursor: pointer;
  border-radius: 0.25rem;
`;

const SizeOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CoverPopover: React.FC<CoverPopoverProps> = ({
  selectedSizeType,
  selectedColor,
  onSelectSizeType,
  onSelectColor,
}) => {
  const colors = [
    "#61bd4f",
    "#f2d600",
    "#ff9f1a",
    "#eb5a46",
    "#c377e0",
    "#0079bf",
    "#00c2e0",
    "#51e898",
    "#ff78cb",
    "#344563",
    "#b3bac5",
    "#b04632",
  ];

  return (
    <Container>
      <SizeOptions>
        <div onClick={() => onSelectSizeType(1)}>
          <SizeTypeOne
            selected={selectedSizeType === 1}
            color={selectedColor}
          />
        </div>
        <div onClick={() => onSelectSizeType(2)}>
          <SizeTypeTwo
            selected={selectedSizeType === 2}
            color={selectedColor}
          />
        </div>
      </SizeOptions>
      <ColorOptions>
        {colors.map((color) => (
          <ColorBox
            key={color}
            color={color}
            selected={color === selectedColor}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </ColorOptions>
    </Container>
  );
};

export default CoverPopover;
