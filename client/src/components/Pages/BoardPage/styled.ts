import styled from 'styled-components';
import { md } from '../../../BreakPoints';

export const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background: linear-gradient(
		90deg,
		rgba(32, 39, 57, 1) 0%,
		rgba(52, 63, 96, 1) 100%
	);
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0.5rem;
	box-sizing: border-box;
`;

export const Content = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: hidden;
	box-sizing: border-box;
`;

export const Main = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	gap: 1rem;
	overflow-x: auto;
	overflow-y: hidden;
	padding-bottom: 0.5rem;
	box-sizing: border-box;

	${md({
    paddingBottom: '1rem',
})}
`;
