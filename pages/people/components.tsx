import { styled } from '@linaria/react';

export const Container = styled.div`
  position: relative;

  h1 {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  & .cv-dl {
    display: inline-block;
    font-size: 0.8em;
  }
`;