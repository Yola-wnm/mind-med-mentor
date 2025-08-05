import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  animationDelay: number;
  color: string;
}

interface ConfettiEffectProps {
  show: boolean;
  onComplete: () => void;
}

const ConfettiEffect = ({ show, onComplete }: ConfettiEffectProps) => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (show) {
      // Generuj kawałki konfetti
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 2,
        color: ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-yellow-400', 'bg-pink-400'][Math.floor(Math.random() * 5)]
      }));
      
      setPieces(newPieces);
      
      // Ukryj po 3 sekundach
      setTimeout(() => {
        setPieces([]);
        onComplete();
      }, 3000);
    }
  }, [show, onComplete]);

  if (!show || pieces.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`absolute w-2 h-2 ${piece.color} animate-confetti`}
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiEffect;