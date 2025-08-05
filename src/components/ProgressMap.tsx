import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Circle, Lock } from "lucide-react";

interface Level {
  id: number;
  name: string;
  category: string;
  completed: boolean;
  locked: boolean;
  description: string;
}

interface ProgressMapProps {
  levels: Level[];
  currentLevel: number;
  onLevelSelect: (levelId: number) => void;
}

const ProgressMap = ({ levels, currentLevel, onLevelSelect }: ProgressMapProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {levels.map((level, index) => (
        <Card
          key={level.id}
          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
            level.locked
              ? "opacity-50 cursor-not-allowed"
              : level.completed
              ? "bg-gradient-success shadow-glow"
              : currentLevel === level.id
              ? "bg-gradient-primary shadow-medical animate-pulse-glow"
              : "hover:shadow-medical"
          }`}
          onClick={() => !level.locked && onLevelSelect(level.id)}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {level.locked ? (
                  <Lock className="w-6 h-6 text-muted-foreground" />
                ) : level.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <Circle className="w-6 h-6 text-primary" />
                )}
                <span className="text-2xl font-bold text-foreground">
                  {level.id}
                </span>
              </div>
              <Badge 
                variant={level.completed ? "default" : "secondary"}
                className={level.completed ? "bg-secondary" : ""}
              >
                {level.category}
              </Badge>
            </div>
            
            <h3 className={`text-lg font-semibold mb-2 ${
              level.completed ? "text-secondary-foreground" : 
              currentLevel === level.id ? "text-primary-foreground" : "text-foreground"
            }`}>
              {level.name}
            </h3>
            
            <p className={`text-sm ${
              level.completed ? "text-secondary-foreground/80" : 
              currentLevel === level.id ? "text-primary-foreground/80" : "text-muted-foreground"
            }`}>
              {level.description}
            </p>
            
            {currentLevel === level.id && (
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                <span className="text-sm text-primary-foreground font-medium">
                  Aktywny poziom
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProgressMap;