import { useEffect } from "react";

export const useKeyboardNavigation = (
  answers: any[],
  onAnswerSelect: (answerId: string) => void,
  onNext: () => void,
  canProceed: boolean,
  selectedAnswer: string | null
) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Tylko gdy nie zaznaczono jeszcze odpowiedzi
      if (!selectedAnswer) {
        const key = event.key;
        
        // Klawisze 1-4 dla odpowiedzi
        if (['1', '2', '3', '4'].includes(key)) {
          const answerIndex = parseInt(key) - 1;
          if (answers[answerIndex]) {
            onAnswerSelect(answers[answerIndex].id);
          }
        }
        
        // Klawisze A-D dla odpowiedzi
        if (['a', 'b', 'c', 'd'].includes(key.toLowerCase())) {
          const answerIndex = key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
          if (answers[answerIndex]) {
            onAnswerSelect(answers[answerIndex].id);
          }
        }
      }
      
      // Enter dla przejścia do następnego pytania
      if (event.key === 'Enter' && canProceed) {
        onNext();
      }
      
      // Spacja dla przejścia do następnego pytania
      if (event.key === ' ' && canProceed) {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [answers, onAnswerSelect, onNext, canProceed, selectedAnswer]);
};