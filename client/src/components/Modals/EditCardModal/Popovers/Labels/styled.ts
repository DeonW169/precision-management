import styled from 'styled-components';

interface ColorProps {
    bg: string;
    hbg: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const SearchArea = styled.input`
  width: 100%;
  padding: 0.4rem;
  border-radius: 5px;
  outline: none;
  font-size: 0.9rem;
  border: 1px solid lightgray;
  box-sizing: border-box;
`;

export const Title = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #172b4d;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Colorbox = styled.div<ColorProps>`
  background-color: ${(props) => props.hbg};
  color: ${(props) => props.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.6rem;
  width: 100%;
  border-radius: 3px;
  cursor: pointer;
  font-weight: 600;
`;

export const ColorText = styled.div`
  font-size: 0.8rem;
`;

export const IconWrapper = styled.div`
  margin-left: 0.5rem;
  cursor: pointer;
  color: #42526e;
`;

export const SmallColorsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.4rem;
`;

export const SmallColorBox = styled.div<ColorProps>`
  background-color: ${(props) => props.hbg};
  color: ${(props) => props.bg};
  border-radius: 3px;
  height: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const BlueButton = styled.button`
  flex: 1;
  background-color: #0079bf;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
`;

export const RedButton = styled.button`
  flex: 1;
  background-color: #eb5a46;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 3px;
  font-weight: 600;
  cursor: pointer;
`;
