import styled from 'styled-components';

export const Container = styled.div`
  padding: 1.5rem;
`;

export const Heading = styled.div`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const Paragraph = styled.div`
  font-size: 0.85rem;
  line-height: 1.4rem;
  margin-bottom: 1rem;
  font-weight: 400;
`;

export const SectionContainer = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const MemberSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MemberInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SectionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
`;

export const DescriptionSectionContainer = styled.div`
  margin-top: 1rem;
`;

export const MemberEmail = styled.span`
  font-size: 0.875rem;
  color: #888;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const SectionTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const MemberName = styled.span`
  font-size: 0.95rem;
  font-weight: 500;
`;

export const DescriptionInput = styled.textarea`
  width: 100%;
  min-height: 3rem;
  font-size: 0.95rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
`;

export const HiddenText = styled.span`
  visibility: hidden;
  position: absolute;
  white-space: pre-wrap;
`;
