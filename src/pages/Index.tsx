import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import GameHeader from "@/components/GameHeader";
import QuestionCard from "@/components/QuestionCard";
import ProgressMap from "@/components/ProgressMap";
import GameStats from "@/components/GameStats";
import { medicalQuestions, Question } from "@/data/medicalQuestions";
import heroImage from "@/assets/medical-hero.jpg";
import { Play, RotateCcw } from "lucide-react";

interface GameState {
  currentQuestionIndex: number;
  score: number;
  lives: number;
  level: number;
  streak: number;
  bestStreak: number;
  totalQuestions: number;
  correctAnswers: number;
  completedCategories: string[];
  gameStarted: boolean;
  gameEnded: boolean;
}

const levels = [
  { id: 1, name: "Zaburzenia spostrzegania", category: "Psychiatria", completed: false, locked: false, description: "Walka z omamami i halucynacjami" },
  { id: 2, name: "Zaburzenia pamięci", category: "Neurologia", completed: false, locked: true, description: "Przywracanie funkcji poznawczych" },
  { id: 3, name: "Zaburzenia myślenia", category: "Psychiatria", completed: false, locked: true, description: "Opanowanie urojeń i psychoz" },
  { id: 4, name: "Zaburzenia ruchowe", category: "Neurologia", completed: false, locked: true, description: "Kontrola nad katatonią" },
  { id: 5, name: "Zaburzenia uczuciowości", category: "Psychiatria", completed: false, locked: true, description: "Stabilizacja nastroju" },
  { id: 6, name: "Zaburzenia świadomości", category: "Neurologia", completed: false, locked: true, description: "Walka z delirium" },
  { id: 7, name: "Choroba Alzheimera", category: "Neurologia", completed: false, locked: true, description: "Ochrona przed otępieniem" },
  { id: 8, name: "Otępienie z ciałami Lewy'ego", category: "Neurologia", completed: false, locked: true, description: "Specjalistyczna terapia" },
];

const Index = () => {
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    lives: 3,
    level: 1,
    streak: 0,
    bestStreak: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    completedCategories: [],
    gameStarted: false,
    gameEnded: false,
  });

  const [currentLevels, setCurrentLevels] = useState(levels);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (gameState.gameStarted && !gameState.gameEnded) {
      loadNextQuestion();
    }
  }, [gameState.currentQuestionIndex, gameState.gameStarted, gameState.gameEnded]);

  const loadNextQuestion = () => {
    if (gameState.currentQuestionIndex < medicalQuestions.length && !gameState.gameEnded) {
      setCurrentQuestion(medicalQuestions[gameState.currentQuestionIndex]);
    } else if (gameState.currentQuestionIndex >= medicalQuestions.length) {
      endGame();
    }
  };

  const startGame = () => {
    setGameState(prev => ({
      ...prev,
      gameStarted: true,
      gameEnded: false,
      currentQuestionIndex: 0,
    }));
  };

  const resetGame = () => {
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      lives: 3,
      level: 1,
      streak: 0,
      bestStreak: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      completedCategories: [],
      gameStarted: false,
      gameEnded: false,
    });
    setCurrentLevels(levels);
  };

  const handleAnswer = (isCorrect: boolean, points: number) => {
    setGameState(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newBestStreak = Math.max(prev.bestStreak, newStreak);
      const newLives = isCorrect ? prev.lives : Math.max(0, prev.lives - 1);
      const newScore = prev.score + points + (newStreak >= 3 ? 50 : 0); // Bonus za serię
      const newCorrectAnswers = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      
      return {
        ...prev,
        score: newScore,
        lives: newLives,
        streak: newStreak,
        bestStreak: newBestStreak,
        totalQuestions: prev.totalQuestions + 1,
        correctAnswers: newCorrectAnswers,
      };
    });

    if (isCorrect) {
      toast({
        title: "Poprawna odpowiedź! 🎉",
        description: `Zdobywasz ${points} punktów${gameState.streak >= 2 ? " + bonus za serię!" : ""}`,
      });
    } else {
      toast({
        title: "Niepoprawna odpowiedź 😞",
        description: "Tracisz życie, ale uczysz się na błędach!",
        variant: "destructive",
      });
      
      if (gameState.lives <= 1) {
        setTimeout(() => endGame(), 1000);
        return;
      }
    }
  };

  const handleNext = () => {
    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));

    // Sprawdź czy to było ostatnie pytanie
    if (gameState.currentQuestionIndex + 1 >= medicalQuestions.length) {
      setTimeout(() => endGame(), 500);
    }
  };

  const endGame = () => {
    setGameState(prev => ({ ...prev, gameEnded: true }));
    
    const finalAccuracy = gameState.totalQuestions > 0 
      ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) 
      : 0;
    
    toast({
      title: "Koniec gry! 🏁",
      description: `Celność: ${finalAccuracy}%, Najlepsza seria: ${gameState.bestStreak}`,
    });
  };

  if (!gameState.gameStarted) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div 
          className="relative h-96 bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-primary/80"></div>
          <div className="relative z-10 text-center text-primary-foreground">
            <h1 className="text-5xl font-bold mb-4 animate-slide-in">
              Wyprawa Przeciw Zaburzeniom Psychicznym
            </h1>
            <p className="text-xl mb-8 animate-slide-in">
              Interaktywna nauka psychiatrii dla studentów medycyny
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={startGame}
              className="animate-pulse-glow"
            >
              <Play className="w-5 h-5 mr-2" />
              Rozpocznij wyprawę
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <GameStats
            totalQuestions={gameState.totalQuestions}
            correctAnswers={gameState.correctAnswers}
            streak={gameState.streak}
            bestStreak={gameState.bestStreak}
            completedCategories={gameState.completedCategories}
          />
          
          <h2 className="text-3xl font-bold text-center mb-8">Mapa Postępu</h2>
          <ProgressMap
            levels={currentLevels}
            currentLevel={gameState.level}
            onLevelSelect={() => {}}
          />
        </div>
      </div>
    );
  }

  if (gameState.gameEnded) {
    const finalAccuracy = gameState.totalQuestions > 0 
      ? Math.round((gameState.correctAnswers / gameState.totalQuestions) * 100) 
      : 0;

    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Wyprawa zakończona!</h1>
          <div className="bg-card p-8 rounded-lg shadow-medical max-w-md mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Twoje wyniki:</h2>
            <div className="space-y-2 text-lg">
              <p>Punkty: <span className="font-bold text-primary">{gameState.score}</span></p>
              <p>Celność: <span className="font-bold text-secondary">{finalAccuracy}%</span></p>
              <p>Najlepsza seria: <span className="font-bold text-accent">{gameState.bestStreak}</span></p>
              <p>Poprawne odpowiedzi: <span className="font-bold">{gameState.correctAnswers}/{gameState.totalQuestions}</span></p>
            </div>
          </div>
          <Button onClick={resetGame} size="lg" className="bg-gradient-primary">
            <RotateCcw className="w-5 h-5 mr-2" />
            Zagraj ponownie
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <GameHeader 
          score={gameState.score} 
          level={gameState.level} 
          lives={gameState.lives} 
        />
        
        {currentQuestion && (
          <div className="flex justify-center">
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
