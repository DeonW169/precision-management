import { css } from 'styled-components';

export const TextOverflow = css`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;

export const HoverEffect = css`
	&:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}
`;

export const Scrollbar = css`
	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-track {
		background: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 20px;
		border: none;
	}
`;
