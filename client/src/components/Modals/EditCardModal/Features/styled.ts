import styled, { css } from 'styled-components';
// import { xs } from '../../../../BreakPoints';

export const Container = styled.div`
	padding-left: 3.5rem;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	gap: 1rem;
	flex-wrap: wrap;
`;

export const Text = styled.p`
	margin: 0;
	padding: 0;
	font-size: 0.875rem;
	overflow-x:hidden;
	word-break: break-all;
`;

export const Icon = styled.img`
  margin-left: 1rem;
`;

export const Box = styled.div`
	height: 3rem;
	width: 8rem;
	padding: 0.5rem 3rem;
	margin-right:auto;
	margin-left:auto;
`;

export const FeatureContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const Title = styled.div`
	color: #5e6c84;
	font-size: 0.85rem;
	font-weight: 600;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

export const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	align-items: center;
	min-height: 2rem;
	gap: 0.3rem;
`;

export const Avatar = styled.div`
	display: flex;
	border-radius: 50%;
	background-color: #5e6c84;
	justify-content: center;
	align-items: center;
	font-weight: 600;
	color: white;
	font-size: 0.85rem;
	height: 2rem;
	width: 2rem;
	cursor: pointer;
`;

export const AddAvatar = styled(Avatar)`
	background-color: rgba(0, 0, 0, 0.06);
	color: #172b4d;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

interface LabelProps {
	color: string;
	hoverColor?: string;
}

export const Label = styled.div<LabelProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 3px;
	height: 2rem;
	min-width: 2.5rem;
	font-size: 0.85rem;
	font-weight: 800;
	padding: 0rem 0.75rem;
	color: white;
	width: auto;
	background-color: ${(props) => props.color};
	cursor: pointer;
	&:hover {
		background-color: ${(props) => props.hoverColor || props.color};
	}
`;

export const AddLabel = styled(Label)`
	background-color: rgba(0, 0, 0, 0.06);
	color: #42526e;
	min-width: 2rem;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

export const DateDropDown = styled.div`
	background-color: rgba(0, 0, 0, 0.04);
	min-height: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	border-radius: 3px;
	cursor: pointer;
	gap: 0.3rem;
	width: fit-content;
	padding: 0rem 0.5rem 0rem 1rem;
	transition: 200ms ease-in;
	&:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}
`;

interface CompleteLabelProps {
	show?: boolean;
}

export const CompleteLabel = styled.div<CompleteLabelProps>`
	display: ${(props) => (props.show ? 'block' : 'none')};
	background-color: #61bd4f;
	color: #fff;
	font-size: 0.75rem;
	padding: 0rem 0.25rem;
	margin-bottom: 2px;
	border-radius: 2px;
`;

export const OverDueLabel = styled(CompleteLabel)`
	background-color: #ec9488;
`;

export const DateText = styled.span`
	font-size: 0.87rem;
	color: #172b4d;
`;
