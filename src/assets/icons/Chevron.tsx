import React from 'react';

import { Icon } from '@/types/icon';

const SvgComponent: React.FC<Icon> = (props) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="48"
      d="M184 112l144 144-144 144"
    />
  </svg>
);

export default SvgComponent;
