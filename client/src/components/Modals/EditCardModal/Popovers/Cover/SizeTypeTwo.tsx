import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  selected: boolean;
  color?: string;
}

const Container = styled.div<{ selected: boolean }>`
  height: 4rem;
  width: 100%;
  border: 2px solid ${(props) => (props.selected ? "#0079bf" : "#fff")};
  border-radius: 5px;
  padding: 1px;
`;

const Wrapper = styled.div<{ top: string }>`
  width: 100%;
  height: 100%;
  border: 1px solid rgba(9, 30, 66, 0.08);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0rem 0.5rem 0.3rem 0.5rem;
  gap: 0.25rem;
  background-color: ${(props) => props.top};
`;

const LongBar = styled.div<{ primary: string }>`
  width: 100%;
  height: 0.25rem;
  border-radius: 3px;
  background-color: ${(props) => props.primary};
`;

const ShortBar = styled(LongBar)`
  width: 75%;
`;

const SizeTypeTwo: React.FC<Props> = ({ selected, color }) => {
  const [colors, setColors] = useState({
    top: color ?? "#CED2DA",
    primary: color ? "#6b778c" : "#fff",
  });

  useEffect(() => {
    setColors({
      top: color ?? "#CED2DA",
      primary: color ? "#6b778c" : "#fff",
    });
  }, [color, selected]);

  return (
    <Container selected={selected}>
      <Wrapper top={colors.top}>
        <LongBar primary={colors.primary} />
        <ShortBar primary={colors.primary} />
      </Wrapper>
    </Container>
  );
};

export default SizeTypeTwo;
