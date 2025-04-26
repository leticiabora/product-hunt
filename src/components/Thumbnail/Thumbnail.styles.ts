import styled from "styled-components";

export const Thumbnail = styled.div<({
  $width: number;
  $height: number
})>`
  position: relative;
  width: ${({ $width }) => $width}px;
  min-width: ${({ $width }) => $width}px;
  min-height: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  border-radius: 1.2rem;
  overflow: hidden;
`;
