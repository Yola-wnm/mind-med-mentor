import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Info, Keyboard } from "lucide-react";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import ConfettiEffect from "./ConfettiEffect";
import QuestionTimer from "./QuestionTimer";

interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface Question {
  id: string;
  category: string;
  question: string;
  answers: Answer[];
  generalExplanation: string;
}

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, points: number) => void;
  onNext: () => void;
  onTimeUp: () => void;
}

const QuestionCard = ({ question, onAnswer, onNext, onTimeUp }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [shakeCard, setShakeCard] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answerId);
    setShowExplanation(true);
    setTimerActive(false);
    
    const answer = question.answers.find(a => a.id === answerId);
    const isCorrect = answer?.isCorrect || false;
    const points = isCorrect ? 100 : 0;
    
    if (isCorrect) {
      setShowConfetti(true);
    } else {
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 600);
    }
    
    // Pozwól przejść do następnego pytania po 2 sekundach
    setTimeout(() => {
      setCanProceed(true);
    }, 2000);
    
    onAnswer(isCorrect, points);
  };

  const handleNext = () => {
    onNext();
  };

  const handleTimeUp = () => {
    if (!selectedAnswer) {
      setTimerActive(false);
      setShakeCard(true);
      setTimeout(() => setShakeCard(false), 600);
      onTimeUp();
    }
  };

  // Nawigacja klawiaturą
  useKeyboardNavigation(
    question.answers,
    handleAnswerSelect,
    handleNext,
    canProceed,
    selectedAnswer
  );

  // Timer
  useEffect(() => {
    if (!timerActive) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive]);

  // Reset przy nowym pytaniu
  useEffect(() => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCanProceed(false);
    setShowConfetti(false);
    setTimeLeft(30);
    setTimerActive(true);
    setShakeCard(false);
  }, [question.id]);

  return (
    <>
      <ConfettiEffect 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <QuestionTimer
          timeLeft={timeLeft}
          totalTime={30}
          isActive={timerActive}
          onTimeUp={handleTimeUp}
        />
        
        <Card className={`shadow-medical animate-fade-in ${shakeCard ? 'animate-shake' : ''}`}>
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl animate-scale-in">{question.question}</CardTitle>
          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground animate-bounce-in">
            {question.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {/* Instrukcja sterowania */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg animate-fade-in">
          <Keyboard className="w-4 h-4" />
          <span>Użyj klawiszy 1-4 lub A-D aby odpowiedzieć, Enter/Spacja aby przejść dalej</span>
        </div>
        <div className="space-y-3">
          {question.answers.map((answer, index) => (
            <Button
              key={answer.id}
              variant={
                selectedAnswer === answer.id
                  ? answer.isCorrect
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className={`w-full text-left justify-start h-auto p-4 transition-all duration-300 animate-scale-in group hover:scale-[1.02] ${
                selectedAnswer && selectedAnswer !== answer.id && answer.isCorrect
                  ? "bg-gradient-success text-secondary-foreground"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => handleAnswerSelect(answer.id)}
              disabled={!!selectedAnswer}
            >
              <div className="flex items-start gap-3 w-full">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {index + 1}
                  </Badge>
                  <Badge variant="outline" className="text-xs group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors">
                    {String.fromCharCode(65 + index)}
                  </Badge>
                </div>
                {selectedAnswer === answer.id && (
                  answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 mt-1 text-green-600 animate-bounce-in" />
                  ) : (
                    <XCircle className="w-5 h-5 mt-1 text-red-600 animate-bounce-in" />
                  )
                )}
                {selectedAnswer && selectedAnswer !== answer.id && answer.isCorrect && (
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600 animate-bounce-in" />
                )}
                <span className="flex-1">{answer.text}</span>
              </div>
            </Button>
          ))}
        </div>

        {showExplanation && selectedAnswer && (
          <div className="mt-6 p-4 bg-muted rounded-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-1 animate-bounce" />
              <div>
                <h4 className="font-semibold mb-2">Wyjaśnienie:</h4>
                <p className="text-sm mb-3">
                  {question.answers.find(a => a.id === selectedAnswer)?.explanation}
                </p>
                <p className="text-sm text-muted-foreground">
                  {question.generalExplanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {canProceed && (
          <div className="mt-6 text-center animate-bounce-in">
            <Button onClick={handleNext} size="lg" variant="medical" className="animate-pulse-glow">
              Następne pytanie → <span className="text-xs ml-2">(Enter/Spacja)</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
    </>
  );
};

export default QuestionCard;