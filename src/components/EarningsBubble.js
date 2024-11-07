import React from 'react';

export const EarningsBubble = ({ cx, cy, quarter, name, onClick }) => (
  <svg
    x={cx - 30}
    y={0}
    width={60}
    height={60}
    style={{ overflow: 'visible', cursor: 'pointer' }}
    onClick={() => onClick(quarter)}
  >
    {/* 세로 점선 */}
    <line
      x1={30}
      y1={20}
      x2={30}
      y2={60}
      stroke="#94a3b8"
      strokeDasharray="2 2"
      strokeWidth={1.5}
    />
    
    {/* 말풍선 */}
    <g>
      <rect
        x={0}
        y={0}
        width={60}
        height={20}
        rx={4}
        fill="#34495e"
      />
      
      <text
        x={30}
        y={14}
        textAnchor="middle"
        fill="white"
        fontSize={12}
      >
        {quarter}
      </text>
      
      <path
        d="M27 20 L30 25 L33 20"
        fill="#34495e"
      />
    </g>

    {/* 노란색 버튼 */}
    <circle 
      cx={30}
      cy={30}
      r={6} 
      fill="#f1c40f"
    />
  </svg>
);

export default EarningsBubble; 