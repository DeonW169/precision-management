import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	width: 100%;
	margin-top: 1rem;
`;

export const LeftContainer = styled.div`
	margin-top: 0.2rem;
`;

export const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: 100%;
	gap: 0.25rem;
`;

export const Title = styled.span`
	font-size: 0.8rem;
	font-weight: 500;
`;

export const CommentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

export const CommentArea = styled.textarea`
	width: 100%;
	font-size: 0.85rem;
	resize: none;
	border: none;
	outline: none;
	background-color: transparent;
	overflow-wrap: break-word;
	word-wrap: break-word;
	word-break: break-word;
`;

export const ButtonContainer = styled.div<{ show: boolean }>`
	display: ${({ show }) => (show ? 'flex' : 'none')};
	flex-direction: row;
	gap: 1rem;
`;

export const LinkContainer = styled.div<{ show: boolean }>`
	display: ${({ show }) => (show ? 'flex' : 'none')};
	flex-direction: row;
	gap: 0.75rem;
`;

export const Link = styled.button`
	font-size: 0.75rem;
	color: #2f80ed;
	font-weight: 500;
	background: none;
	border: none;
	cursor: pointer;
	text-decoration: underline;

	&:hover {
		text-decoration: none;
	}
`;
