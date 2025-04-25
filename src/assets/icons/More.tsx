import React from 'react';

import { Icon } from '@/types/icon';

const SvgComponent: React.FC<Icon> = (props) => (
  <svg viewBox="0 0 512 512" {...props}>
    <circle
      cx="256"
      cy="256"
      r="32"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <circle
      cx="256"
      cy="416"
      r="32"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
    <circle
      cx="256"
      cy="96"
      r="32"
      fill="none"
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="32"
    />
  </svg>
);

export default SvgComponent;
