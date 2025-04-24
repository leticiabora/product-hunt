import Link from "next/link";
import styled from "styled-components";

export const LinkContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: inherit;
  text-decoration: none;
  border: 1px solid transparent;
  &:hover {
    cursor: pointer;
  }
`;