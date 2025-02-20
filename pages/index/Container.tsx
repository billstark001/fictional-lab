import { styled } from "@linaria/react";
import { mediaQueryLessOrEqual } from "@/lib/responsive";


export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;

  ${mediaQueryLessOrEqual('md')} {
    & {
      flex-direction: column;
    }
  }
`;