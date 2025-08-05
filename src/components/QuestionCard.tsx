import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Info } from "lucide-react";

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
}

const QuestionCard = ({ question, onAnswer, onNext }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const handleAnswerSelect = (answerId: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answerId);
    setShowExplanation(true);
    
    const answer = question.answers.find(a => a.id === answerId);
    const isCorrect = answer?.isCorrect || false;
    const points = isCorrect ? 100 : 0;
    
    // Pozwól przejść do następnego pytania po 2 sekundach
    setTimeout(() => {
      setCanProceed(true);
    }, 2000);
    
    onAnswer(isCorrect, points);
  };

  const handleNext = () => {
    onNext();
    // Reset stanu dla następnego pytania
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCanProceed(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medical animate-slide-in">
      <CardHeader className="bg-gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{question.question}</CardTitle>
          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
            {question.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-3">
          {question.answers.map((answer) => (
            <Button
              key={answer.id}
              variant={
                selectedAnswer === answer.id
                  ? answer.isCorrect
                    ? "default"
                    : "destructive"
                  : "outline"
              }
              className={`w-full text-left justify-start h-auto p-4 transition-all duration-300 ${
                selectedAnswer && selectedAnswer !== answer.id && answer.isCorrect
                  ? "bg-gradient-success text-secondary-foreground"
                  : ""
              }`}
              onClick={() => handleAnswerSelect(answer.id)}
              disabled={!!selectedAnswer}
            >
              <div className="flex items-start gap-3 w-full">
                {selectedAnswer === answer.id && (
                  answer.isCorrect ? (
                    <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 mt-1 text-red-600" />
                  )
                )}
                {selectedAnswer && selectedAnswer !== answer.id && answer.isCorrect && (
                  <CheckCircle className="w-5 h-5 mt-1 text-green-600" />
                )}
                <span className="flex-1">{answer.text}</span>
              </div>
            </Button>
          ))}
        </div>

        {showExplanation && selectedAnswer && (
          <div className="mt-6 p-4 bg-muted rounded-lg animate-slide-in">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-1" />
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
          <div className="mt-6 text-center">
            <Button onClick={handleNext} size="lg" variant="medical">
              Następne pytanie →
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;