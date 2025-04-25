import React from 'react';

import { Icon } from '@/types/icon';

const CloseIcon: React.FC<Icon> = (props) => (
  <svg viewBox="0 0 512 512" {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="40"
      d="M368 368L144 144M368 144L144 368"
    />
  </svg>
);

export default CloseIcon;
