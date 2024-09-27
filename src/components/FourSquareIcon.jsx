import React from 'react';

const FourSquareIcon = ({ color = '#fff', width = '20px', height = '20px' }) => {
  return (
    <svg
      fill={color}
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="-27.8 -27.8 333.60 333.60"
      xmlSpace="preserve"
      width={width}
      height={height}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
        strokeWidth="26.131999999999998"
      >
        <g>
          <rect x="0" y="0" width="119.054" height="119.054" />
          <rect x="158.946" y="0" width="119.054" height="119.054" />
          <rect x="158.946" y="158.946" width="119.054" height="119.054" />
          <rect x="0" y="158.946" width="119.054" height="119.054" />
        </g>
      </g>

      <g id="SVGRepo_iconCarrier">
        <g>
          <rect x="0" y="0" width="119.054" height="119.054" />
          <rect x="158.946" y="0" width="119.054" height="119.054" />
          <rect x="158.946" y="158.946" width="119.054" height="119.054" />
          <rect x="0" y="158.946" width="119.054" height="119.054" />
        </g>
      </g>
    </svg>
  );
};

export default FourSquareIcon;
