import React from 'react';

const Logo: React.FC = () => (
    <span className='flex items-center gap-2 text-xl font-oswald'>
    <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Calendar Logo"
    >
        <rect x="3" y="5" width="24" height="24" rx="2" fill="#1976D2" />
        <rect x="3" y="5" width="24" height="6" rx="1" fill="#42A5F5" />
        <rect x="6" y="13" width="5" height="5" rx="1" fill="#FFF" />
        <rect x="12.5" y="13" width="5" height="5" rx="1" fill="#FFF" />
        <rect x="19" y="13" width="5" height="5" rx="1" fill="#FFF" />
        <rect x="6" y="20" width="5" height="5" rx="1" fill="#FFF" />
        <rect x="12.5" y="20" width="5" height="5" rx="1" fill="#FFF" />
        <rect x="19" y="20" width="5" height="5" rx="1" fill="#FFF" />
        <rect x="6" y="3" width="4" height="5" rx="1" fill="#1976D2" />
        <rect x="20" y="3" width="4" height="5" rx="1" fill="#1976D2" />
    </svg>
    FCalendar
    </span>
);

export default Logo;