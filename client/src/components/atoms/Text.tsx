import React from 'react';
import styled from 'styled-components';
import palette from '../../@types/Palette';

const StyledText = styled.span<StyledTextPropsType>`
  display: block;

  font-size: ${(props) => `${props.size.toString()}px`};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
`;

export type StyledTextPropsType = {
  size: number;
  weight: string;
  color: string;
};

export type TextPropsType = {
  size?: number;
  weight?: string;
  color?: string;
  children: React.ReactNode;
};

function Text({ size = 12, weight = 'normal', color = palette.DARK_GREY, children }: TextPropsType) {
  return (
    <StyledText size={size} weight={weight} color={color}>
      {children}
    </StyledText>
  );
}

export default Text;
