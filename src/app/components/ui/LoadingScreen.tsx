import { useEffect, useState } from 'react';
const logoImg = '/logo.png';

interface Props {
  onComplete: () => void;
}

type Particle = { width: number; height: number; left: string; top: string; background: string; animation: string; animationDelay: string };

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    setParticles(Array.from({ length: 16 }).map((_, i) => ({
      width: Math.random() * 6 + 2,
      height: Math.random() * 6 + 2,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      background: i % 2 === 0 ? '#0EA5E9' : '#3BE3A0',
      animation: `particleDrift ${3 + Math.random() * 4}s ease-in-out infinite`,
      animationDelay: `${Math.random() * 3}s`,
    })));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setHidden(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return p + (p < 80 ? 2 : 0.8);
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`}>
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles?.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              left: p.left,
              top: p.top,
              background: p.background,
              opacity: 0.3,
              animation: p.animation,
              animationDelay: p.animationDelay,
            }}
          />
        ))}
      </div>

      {/* Circuit SVG lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="40%" y2="20%" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="60%" y1="80%" x2="90%" y2="80%" stroke="#3BE3A0" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="80%" y1="20%" x2="80%" y2="50%" stroke="#0EA5E9" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="40%" cy="20%" r="3" fill="#0EA5E9" />
        <circle cx="80%" cy="50%" r="3" fill="#3BE3A0" />
      </svg>

      {/* Animated company mark */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="brand-loader-scene" aria-label="Leafclutch Technologies">
          <div className="brand-loader-glow" />
          <div className="brand-loader-orbit brand-loader-orbit-one">
            <span className="brand-loader-dot brand-loader-dot-blue" />
            <span className="brand-loader-dot brand-loader-dot-green" />
            <span className="brand-loader-dot brand-loader-dot-cyan" />
            <span className="brand-loader-dot brand-loader-dot-mint" />
          </div>
          <div className="brand-loader-orbit brand-loader-orbit-two">
            <span className="brand-loader-dot brand-loader-dot-green" />
            <span className="brand-loader-dot brand-loader-dot-blue" />
          </div>
          <div className="brand-loader-ring">
            <img src={logoImg} alt="Leafclutch Technologies Pvt. Ltd." className="brand-loader-logo" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex flex-col items-center gap-3 w-64">
          <div className="loader-bar-track">
            <div className="loader-bar-fill" />
          </div>
          <div className="flex justify-between w-full">
            <span className="text-gray-400 text-xs font-mono">Loading...</span>
            <span className="text-cyan-400 text-xs font-mono">{Math.round(progress)}%</span>
          </div>
        </div>

        <p className="text-gray-500 text-xs tracking-wider">
          Building Intelligent Software & AI
        </p>
      </div>
    </div>
  );
}
