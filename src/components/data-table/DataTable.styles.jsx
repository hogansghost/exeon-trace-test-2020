import styled from 'styled-components'


export const Table = styled.div`
  overflow-wrap: break-word;
  max-width: 100%;
`;


export const Row = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
`;


export const Cell = styled.div`
  flex: 1 1 auto;
  width: calc(100% / 7);
  padding: 8px;
`;
