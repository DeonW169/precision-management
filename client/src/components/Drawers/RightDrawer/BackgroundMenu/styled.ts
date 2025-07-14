import styled from 'styled-components';

type ImageProps = {
    link?: string;
    bg?: string;
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const SubContainer = styled.div`
  cursor: pointer;
`;

export const Image = styled.div<ImageProps>`
  background-image: ${({ link, bg }) => (link ? `url(${link})` : bg ? 'none' : '')};
  background-color: ${({ bg }) => bg || 'transparent'};
  background-position: center;
  background-size: cover;
  border-radius: 3px;
  height: 6rem;
  width: 100%;
`;

export const Title = styled.h5`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0;
`;

export const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

export const PhotosWrapper = styled.div`
  height: 6rem;
  width: 100%;
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
`;
