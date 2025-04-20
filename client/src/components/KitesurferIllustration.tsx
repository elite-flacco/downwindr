import React from 'react';

interface KitesurferIllustrationProps {
  className?: string;
}

export default function KitesurferIllustration({ className = "w-full h-auto" }: KitesurferIllustrationProps) {
  return (
    <svg
      className={className}
      width="800"
      height="500"
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Sky and clouds */}
      <rect width="800" height="350" fill="#e0f2fe" />
      
      {/* Sun */}
      <circle cx="650" cy="100" r="50" fill="#fde68a" />
      <circle cx="650" cy="100" r="40" fill="#fef3c7" />
      
      {/* Clouds */}
      <g>
        <circle cx="150" cy="70" r="20" fill="white" />
        <circle cx="180" cy="60" r="25" fill="white" />
        <circle cx="210" cy="70" r="20" fill="white" />
        <rect x="150" y="70" width="60" height="20" fill="white" />
      </g>
      
      <g>
        <circle cx="450" cy="50" r="15" fill="white" />
        <circle cx="480" cy="40" r="20" fill="white" />
        <circle cx="510" cy="50" r="15" fill="white" />
        <rect x="450" y="50" width="60" height="15" fill="white" />
      </g>
      
      <g>
        <circle cx="300" cy="120" r="18" fill="white" />
        <circle cx="330" cy="110" r="22" fill="white" />
        <circle cx="360" cy="120" r="18" fill="white" />
        <rect x="300" y="120" width="60" height="18" fill="white" />
      </g>
      
      {/* Ocean */}
      <path
        d="M0 350 L800 350 L800 500 L0 500 Z"
        fill="#0ea5e9"
      />
      
      {/* Waves - hand-drawn style */}
      <path 
        d="M0 350 Q50 320, 100 350 Q150 380, 200 350 Q250 320, 300 350 Q350 380, 400 350 Q450 320, 500 350 Q550 380, 600 350 Q650 320, 700 350 Q750 380, 800 350" 
        stroke="white" 
        strokeWidth="3" 
        fill="none" 
      />
      <path 
        d="M0 370 Q50 340, 100 370 Q150 400, 200 370 Q250 340, 300 370 Q350 400, 400 370 Q450 340, 500 370 Q550 400, 600 370 Q650 340, 700 370 Q750 400, 800 370" 
        stroke="white" 
        strokeWidth="2" 
        fill="none" 
      />
      
      {/* Kite */}
      <path
        d="M360 120 C420 80, 480 50, 540 100 C500 150, 400 170, 360 120"
        fill="#f43f5e"
        stroke="#881337"
        strokeWidth="3"
      />
      
      {/* Kite strings */}
      <line x1="440" y1="110" x2="300" y2="300" stroke="#475569" strokeWidth="2" />
      <line x1="460" y1="110" x2="300" y2="300" stroke="#475569" strokeWidth="2" />
      <line x1="480" y1="110" x2="300" y2="300" stroke="#475569" strokeWidth="2" />
      
      {/* Kitesurfer - simple cartoon style */}
      <g>
        {/* Surfboard */}
        <ellipse cx="300" cy="380" rx="60" ry="15" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
        
        {/* Body */}
        <path
          d="M300 300 C305 330, 295 350, 300 365"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Arms - one extended to hold kite strings */}
        <path
          d="M300 310 L260 330"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M300 310 L340 320"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Legs */}
        <path
          d="M300 350 C290 365, 280 375, 280 380"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M300 350 C310 365, 320 375, 320 380"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Head */}
        <circle cx="300" cy="290" r="15" fill="#fed7aa" />
        
        {/* Hair - scribbled */}
        <path
          d="M290 280 C295 275, 305 275, 310 280"
          stroke="#0f172a"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Simple face */}
        <circle cx="295" cy="288" r="2" fill="#0f172a" />
        <circle cx="305" cy="288" r="2" fill="#0f172a" />
        <path
          d="M298 295 C300 297, 302 295, 303 295"
          stroke="#0f172a"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      
      {/* Water splashes - hand-drawn scribbles */}
      <path
        d="M280 380 C275 375, 270 380, 265 375 C260 380, 255 375, 250 380"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M320 380 C325 375, 330 380, 335 375 C340 380, 345 375, 350 380"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Wind lines */}
      <path
        d="M150 150 C170 155, 190 145, 210 150"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M180 180 C200 185, 220 175, 240 180"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M120 220 C140 225, 160 215, 180 220"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}