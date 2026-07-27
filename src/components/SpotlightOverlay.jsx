import { useState, useEffect } from 'react';

export default function SpotlightOverlay() {
  const [position, setPosition] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.04), transparent 80%)`,
      }}
    />
  );
}
