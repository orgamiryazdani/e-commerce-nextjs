'use client';
import React, { FC } from 'react';
import { SvgIconType } from './icon.types';

export const BaseIcon: FC<SvgIconType> = ({
  color = 'currentColor',
  width = 30,
  height = 30,
  children,
  viewBox = '0 0 30 30',
  strokeWidth = '1.5',
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
      stroke={`${color}`}
    >
      {children}
    </svg>
  );
};

export default BaseIcon;
