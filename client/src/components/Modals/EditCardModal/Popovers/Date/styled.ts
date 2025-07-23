import styled from 'styled-components';
import { DateRange } from 'react-date-range';

export const DateDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const CustomDateRange = styled(DateRange)`
  font-family: 'Poppins', sans-serif;
  font-size: 0.85rem;
`;

export const PopoverHeader = styled.div`
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;
`;

export const PopoverDescription = styled.div`
  font-size: 13px;
  color: #6b6b6b;
  margin-bottom: 10px;
`;

export const PopoverContent = styled.div`
  padding: 10px 0;
`;