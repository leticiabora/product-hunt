import React from 'react';

import { Icon } from '@/types/icon';

const SvgComponent: React.FC<Icon> = (props) => (
  <svg viewBox="0 0 250 250" {...props}>
  <path d="M144,192a16,16,0,1,1-16-16A16.01833,16.01833,0,0,1,144,192ZM128,80a16,16,0,1,0-16-16A16.01833,16.01833,0,0,0,128,80Zm0,32a16,16,0,1,0,16,16A16.01833,16.01833,0,0,0,128,112Z"/>
  </svg>
);

export default SvgComponent;
