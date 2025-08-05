import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Timer, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface QuestionTimerProps {
  timeLeft: number;
  totalTime: number;
  isActive: boolean;
  onTimeUp: () => void;
}

const QuestionTimer = ({ timeLeft, totalTime, isActive, onTimeUp }: QuestionTimerProps) => {
  const percentage = (timeLeft / totalTime) * 100;
  const isUrgent = percentage < 25;

  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp]);

  return (
    <Card className={`mb-4 ${isUrgent ? 'animate-pulse-glow border-destructive' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Timer className={`w-4 h-4 ${isUrgent ? 'text-destructive animate-bounce' : 'text-primary'}`} />
            <span className="text-sm font-medium">Czas na odpowiedź</span>
          </div>
          <Badge variant={isUrgent ? "destructive" : "secondary"} className="animate-scale-in">
            {timeLeft}s
          </Badge>
        </div>
        
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isUrgent 
                ? 'bg-destructive animate-pulse' 
                : percentage > 50 
                  ? 'bg-secondary' 
                  : 'bg-accent'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {isUrgent && (
          <div className="flex items-center gap-1 mt-2 text-destructive text-xs animate-bounce">
            <Zap className="w-3 h-3" />
            Pośpiesz się!
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionTimer;