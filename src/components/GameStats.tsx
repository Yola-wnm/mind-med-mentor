import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Brain, TrendingUp } from "lucide-react";

interface GameStatsProps {
  totalQuestions: number;
  correctAnswers: number;
  streak: number;
  bestStreak: number;
  completedCategories: string[];
}

const GameStats = ({ 
  totalQuestions, 
  correctAnswers, 
  streak, 
  bestStreak,
  completedCategories 
}: GameStatsProps) => {
  const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-gradient-primary text-primary-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Celność
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{accuracy}%</div>
          <p className="text-xs text-primary-foreground/80">
            {correctAnswers}/{totalQuestions} poprawnych
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-success text-secondary-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Seria
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{streak}</div>
          <p className="text-xs text-secondary-foreground/80">
            Rekord: {bestStreak}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-warning text-accent-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Brain className="w-4 h-4" />
            Wiedza
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedCategories.length}</div>
          <p className="text-xs text-accent-foreground/80">
            Ukończone kategorie
          </p>
        </CardContent>
      </Card>

      <Card className="bg-card border-2 border-accent">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            Osiągnięcia
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {completedCategories.map((category, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {category}
              </Badge>
            ))}
            {completedCategories.length === 0 && (
              <p className="text-xs text-muted-foreground">Brak jeszcze osiągnięć</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GameStats;