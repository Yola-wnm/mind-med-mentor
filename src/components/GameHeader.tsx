import { Brain, Heart, Shield } from "lucide-react";

interface GameHeaderProps {
  score: number;
  level: number;
  lives: number;
}

const GameHeader = ({ score, level, lives }: GameHeaderProps) => {
  return (
    <div className="bg-gradient-primary p-6 rounded-lg shadow-medical mb-6">
      <div className="flex items-center justify-between text-primary-foreground">
        <div className="flex items-center gap-4">
          <Brain className="w-8 h-8 animate-pulse-glow" />
          <h1 className="text-2xl font-bold">Wyprawa Przeciw Zaburzeniom</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Poziom: {level}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="bg-primary-foreground/20 px-3 py-1 rounded-full">
              <span className="font-bold">Punkty: {score}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {Array.from({ length: lives }).map((_, i) => (
                <Heart key={i} className="w-5 h-5 fill-red-500 text-red-500" />
              ))}
              {Array.from({ length: 3 - lives }).map((_, i) => (
                <Heart key={i} className="w-5 h-5 text-primary-foreground/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameHeader;