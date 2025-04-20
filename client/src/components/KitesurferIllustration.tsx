import React, { useEffect, useRef } from 'react';

interface KitesurferIllustrationProps {
  className?: string;
}

export default function KitesurferIllustration({ className = "w-full h-auto" }: KitesurferIllustrationProps) {
  // Reference to SVG elements for animation
  const leftKitesurferRef = useRef<SVGGElement>(null);
  const rightKitesurferRef = useRef<SVGGElement>(null);
  const kiteRef = useRef<SVGPathElement>(null);
  const kite2Ref = useRef<SVGPathElement>(null);
  const wavesRef = useRef<SVGPathElement>(null);
  const cloudsRef = useRef<SVGGElement[]>([]);
  const windLinesRef = useRef<SVGPathElement[]>([]);
  
  // Animation logic using requestAnimationFrame
  useEffect(() => {
    let frameId: number;
    let angle = 0;
    let wave = 0;
    
    // Animation function
    const animate = () => {
      angle += 0.01;
      wave += 0.02;
      
      // Animate kitesurfers bobbing up and down
      if (leftKitesurferRef.current) {
        leftKitesurferRef.current.setAttribute('transform', `translate(0, ${Math.sin(angle * 2) * 5})`);
      }
      
      if (rightKitesurferRef.current) {
        rightKitesurferRef.current.setAttribute('transform', `translate(0, ${Math.sin(angle * 2 + 1) * 4})`);
      }
      
      // Animate kites swaying
      if (kiteRef.current) {
        kiteRef.current.setAttribute('transform', `rotate(${Math.sin(angle) * 5}, 400, 100)`);
      }
      
      if (kite2Ref.current) {
        kite2Ref.current.setAttribute('transform', `rotate(${Math.sin(angle + 1) * 3}, 200, 150)`);
      }
      
      // Animate clouds moving
      cloudsRef.current.forEach((cloud, i) => {
        if (cloud) {
          const speed = 0.2 + (i * 0.1);
          const xPos = (angle * speed) % 100;
          cloud.setAttribute('transform', `translate(${xPos}, 0)`);
        }
      });
      
      // Animate wind lines fading in and out
      windLinesRef.current.forEach((line, i) => {
        if (line) {
          const opacity = (Math.sin(angle * 3 + i) + 1) / 2;
          line.setAttribute('opacity', opacity.toString());
        }
      });
      
      frameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    frameId = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);
  
  // Store cloud refs
  const addCloudRef = (el: SVGGElement | null, index: number) => {
    if (el) {
      cloudsRef.current[index] = el;
    }
  };
  
  // Store wind line refs
  const addWindLineRef = (el: SVGPathElement | null, index: number) => {
    if (el) {
      windLinesRef.current[index] = el;
    }
  };
  
  return (
    <svg
      className={className}
      width="800"
      height="500"
      viewBox="0 0 800 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background gradient with transparency for blending */}
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ecfeff" />
          <stop offset="100%" stopColor="#a5f3fc" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0c4a6e" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="650" cy="80" r="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#fef9c3" stopOpacity="0" />
        </radialGradient>
      </defs>
      
      {/* Sky with gradient - with transparency for blending with page background */}
      <rect width="800" height="350" fill="url(#skyGradient)" fillOpacity="0.7" />
      
      {/* Sun glow effect */}
      <circle cx="650" cy="80" r="70" fill="url(#sunGlow)" />
      
      {/* Sun */}
      <circle cx="650" cy="80" r="40" fill="#fde68a" />
      <circle cx="650" cy="80" r="30" fill="#fef3c7" />
      
      {/* Animated clouds */}
      <g ref={(el) => addCloudRef(el, 0)}>
        <circle cx="150" cy="70" r="20" fill="white" />
        <circle cx="180" cy="60" r="25" fill="white" />
        <circle cx="210" cy="70" r="20" fill="white" />
        <rect x="150" y="70" width="60" height="20" fill="white" />
      </g>
      
      <g ref={(el) => addCloudRef(el, 1)}>
        <circle cx="450" cy="50" r="15" fill="white" />
        <circle cx="480" cy="40" r="20" fill="white" />
        <circle cx="510" cy="50" r="15" fill="white" />
        <rect x="450" y="50" width="60" height="15" fill="white" />
      </g>
      
      <g ref={(el) => addCloudRef(el, 2)}>
        <circle cx="300" cy="120" r="18" fill="white" />
        <circle cx="330" cy="110" r="22" fill="white" />
        <circle cx="360" cy="120" r="18" fill="white" />
        <rect x="300" y="120" width="60" height="18" fill="white" />
      </g>
      
      {/* Ocean with gradient */}
      <path
        d="M0 350 L800 350 L800 500 L0 500 Z"
        fill="url(#oceanGradient)"
      />
      
      {/* Waves - hand-drawn style */}
      <path 
        ref={wavesRef}
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
        opacity="0.8"
      />
      <path 
        d="M0 390 Q50 360, 100 390 Q150 420, 200 390 Q250 360, 300 390 Q350 420, 400 390 Q450 360, 500 390 Q550 420, 600 390 Q650 360, 700 390 Q750 420, 800 390" 
        stroke="white" 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.6"
      />
      
      {/* Left Kitesurfer - more gender neutral */}
      <g ref={leftKitesurferRef}>
        {/* Kite for left surfer */}
        <path
          ref={kiteRef}
          d="M400 100 C460 60, 520 30, 580 80 C540 130, 440 150, 400 100"
          fill="#0ea5e9"
          stroke="#0c4a6e"
          strokeWidth="3"
        />
        
        {/* Kite strings */}
        <line x1="480" y1="90" x2="220" y2="290" stroke="#475569" strokeWidth="1.5" />
        <line x1="500" y1="90" x2="220" y2="290" stroke="#475569" strokeWidth="1.5" />
        <line x1="520" y1="90" x2="220" y2="290" stroke="#475569" strokeWidth="1.5" />
        
        {/* Surfboard */}
        <ellipse cx="220" cy="380" rx="55" ry="12" fill="#14b8a6" stroke="#0f766e" strokeWidth="2" />
        
        {/* Body */}
        <path
          d="M220 300 C225 330, 215 350, 220 365"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Arms - one extended to hold kite strings */}
        <path
          d="M220 310 L180 330"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M220 310 L260 320"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Legs */}
        <path
          d="M220 350 C210 365, 200 375, 200 380"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M220 350 C230 365, 240 375, 240 380"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Head - more neutral */}
        <circle cx="220" cy="290" r="15" fill="#fcd34d" />
        
        {/* Shaggy hairstyle - more gender neutral */}
        <path
          d="M205 280 C210 275, 215 272, 220 270 C225 272, 230 275, 235 280"
          stroke="#0f172a"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M205 285 C210 282, 215 280, 220 280 C225 280, 230 282, 235 285"
          stroke="#0f172a"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Simple face - sunglasses style */}
        <path
          d="M210 288 C212 286, 215 286, 218 287"
          stroke="#0f172a"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M222 287 C225 286, 228 286, 230 288"
          stroke="#0f172a"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M218 295 C220 296, 222 295, 223 295"
          stroke="#0f172a"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      
      {/* Right Kitesurfer - second person, different style */}
      <g ref={rightKitesurferRef}>
        {/* Kite for second person */}
        <path
          ref={kite2Ref}
          d="M200 150 C240 120, 280 100, 320 140 C290 180, 230 190, 200 150"
          fill="#f43f5e"
          stroke="#881337"
          strokeWidth="3"
        />
        
        {/* Kite strings */}
        <line x1="240" y1="140" x2="450" y2="300" stroke="#475569" strokeWidth="1.5" />
        <line x1="260" y1="140" x2="450" y2="300" stroke="#475569" strokeWidth="1.5" />
        <line x1="280" y1="140" x2="450" y2="300" stroke="#475569" strokeWidth="1.5" />
        
        {/* Surfboard */}
        <ellipse cx="450" cy="380" rx="55" ry="12" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
        
        {/* Body - slightly different pose */}
        <path
          d="M450 310 C445 330, 455 350, 450 365"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Arms - different pose */}
        <path
          d="M450 315 L490 330"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M450 315 L410 330"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Legs */}
        <path
          d="M450 350 C440 365, 430 375, 430 380"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M450 350 C460 365, 470 375, 470 380"
          stroke="#0f172a"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Head - different skin tone */}
        <circle cx="450" cy="295" r="15" fill="#d6d3d1" />
        
        {/* Different hairstyle - short hair */}
        <path
          d="M440 280 C445 275, 450 273, 455 275"
          stroke="#0f172a"
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M442 283 C445 280, 450 278, 455 280"
          stroke="#0f172a"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Simple face */}
        <circle cx="445" cy="293" r="2" fill="#0f172a" />
        <circle cx="455" cy="293" r="2" fill="#0f172a" />
        <path
          d="M447 302 C450 303, 453 302, 454 301"
          stroke="#0f172a"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      
      {/* Water splashes - hand-drawn scribbles */}
      <path
        d="M200 380 C195 375, 190 380, 185 375 C180 380, 175 375, 170 380"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M240 380 C245 375, 250 380, 255 375 C260 380, 265 375, 270 380"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M430 380 C425 375, 420 380, 415 375 C410 380, 405 375, 400 380"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M470 380 C475 375, 480 380, 485 375 C490 380, 495 375, 500 380"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Wind lines with animation */}
      <path
        ref={(el) => addWindLineRef(el, 0)}
        d="M100 150 C120 155, 140 145, 160 150"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        ref={(el) => addWindLineRef(el, 1)}
        d="M130 180 C150 185, 170 175, 190 180"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        ref={(el) => addWindLineRef(el, 2)}
        d="M70 220 C90 225, 110 215, 130 220"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        ref={(el) => addWindLineRef(el, 3)}
        d="M350 120 C370 125, 390 115, 410 120"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        ref={(el) => addWindLineRef(el, 4)}
        d="M550 180 C570 185, 590 175, 610 180"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
      <path
        ref={(el) => addWindLineRef(el, 5)}
        d="M650 220 C670 225, 690 215, 710 220"
        stroke="#94a3b8"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}