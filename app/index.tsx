import { useState } from 'react';
import HomeScreen from '../components/HomeScreen';
import QuizScreenTeste from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import questions from '../questions.json';

const TOTAL_QUESTIONS = 10;

// Embaralha todas as perguntas e pega apenas 10
function sortearPerguntas() {
  return [...questions].sort(() => Math.random() - 0.5).slice(0, TOTAL_QUESTIONS);
}

export default function HomePage() {
  const [tela, setTela] = useState<'home' | 'quiz' | 'resultado'>('home');

  const [quizQuestions, setQuizQuestions] = useState(() => sortearPerguntas());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [quizSession, setQuizSession] = useState(0);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleStart = () => {
    setQuizQuestions(sortearPerguntas());
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setTela('quiz');
    setQuizSession((prev) => prev + 1);
  };

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setTela('resultado');
    }
  };

  const handlePlayAgain = () => {
    setTela('home');
  };

  const handleRestartQuiz = () => {
    handleStart();
  };

  // Renderização de cada tela
  if (tela === 'home') {
    return <HomeScreen onStart={handleStart} />;
  }

  if (tela === 'resultado') {
    return (
      <ResultScreen
        score={score}
        totalQuestions={quizQuestions.length}
        onPlayAgain={handlePlayAgain}
      />
    );
  }

  return (
    <QuizScreenTeste
      key={`${quizSession}-${currentQuestionIndex}`}
      currentQuestion={currentQuestion}
      currentIndex={currentQuestionIndex + 1}
      totalQuestions={quizQuestions.length}
      score={score}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
      onRestartQuiz={handleRestartQuiz}
    />
  );
}