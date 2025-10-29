
import React from 'react';

export const RunningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="6.5" cy="4.5" r="2.5"></circle>
    <path d="M12.5 19.5l-2-3-3-2-2.5 3.5"></path>
    <path d="M17.5 13.5L12 17l-3-4"></path>
    <path d="M10 10l-1.5 1.5"></path>
    <path d="m14 5 3 4-3 4"></path>
  </svg>
);
