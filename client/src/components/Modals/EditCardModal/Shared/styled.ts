import styled from 'styled-components';

export const IconButtonContainer = styled.button`
	display: inline-flex;
	box-sizing: border-box;
	align-items: center;
	justify-content: flex-start;
	background-color: rgba(0, 0, 0, 0.06);
	font-size: 0.875rem;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	color: #172b4d;
	padding: 0.375rem;
	height:2rem;
	gap: 0.5rem;
	width:100%;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
	&:active {
		background-color: #e4f0f6;
		color: #0079bf;
	}
`;

export const Span = styled.span`
	color: inherit;
	font-size: inherit;
	display: inline;
`;

export const PopoverContent = styled.div`
  padding: 10px 0;
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OverlayBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const CloseIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  cursor: pointer;
  font-size: 18px;
  color: #555;
  z-index: 1301;
`;

export const CheckboxContainer = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

export const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
`;

export const StyledCheckbox = styled.div<{ checked: boolean }>`
  width: 18px;
  height: 18px;
  background: ${({ checked }) => (checked ? "#007bff" : "#fff")};
  border: 2px solid #007bff;
  border-radius: 4px;
  transition: all 0.2s ease;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.4);
  }

  &::after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    position: relative;
    top: 2px;
    left: 5px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0de;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressFiller = styled.div<{ percentage: number }>`
  height: 100%;
  width: ${({ percentage }) => `${percentage}%`};
  background-color: ${({ percentage }) =>
		percentage < 50 ? "#f39c12" : percentage < 80 ? "#3498db" : "#2ecc71"};
  transition: width 0.3s ease-in-out;
`;