import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  currentIndex: number;
  totalQuestions: number;
  score: number;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
  onRestartQuiz: () => void; 
};

const INITIAL_TIME = 10;

const DINO_IMAGES = [
  require('../assets/img/dinossauro1.png'),
  require('../assets/img/dinossauro2.png'),
  require('../assets/img/dinossauro3.png'),
  require('../assets/img/dinossauro4.png'),
];

export default function QuizScreen({
  currentQuestion,
  currentIndex,
  totalQuestions,
  score,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
  onRestartQuiz, 
}: QuizScreenProps) {

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const overlayFadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeLeft(INITIAL_TIME);

    const randomIndex = Math.floor(Math.random() * DINO_IMAGES.length);
    setCurrentImageIndex(randomIndex);

    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  useEffect(() => {
    if (timeLeft === 0 && selectedOption === null && !isOptionsDisabled) {
      onOptionPress('__TIMEOUT__');
    }
  }, [timeLeft, selectedOption, isOptionsDisabled]);

  useEffect(() => {
    if (selectedOption !== null) {
      Animated.timing(overlayFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      overlayFadeAnim.setValue(0);
    }
  }, [selectedOption]);

  const getOptionStyle = (option: string) => {
    if (selectedOption !== null) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) return styles.correctOption;
      if (option === selectedOption && !isCorrect) return styles.incorrectOption;
    }
    return {};
  };

  const getOptionTextStyle = (option: string) => {
    if (selectedOption !== null) {
      if (option === currentQuestion.correctAnswer) return styles.correctText;
      if (option === selectedOption) return styles.incorrectText;
    }
    return {};
  };

  const isTimeOut = timeLeft === 0 || selectedOption === '__TIMEOUT__';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.innerFrame}>
        
          <Animated.View style={[styles.topSection, { opacity: fadeAnim }]}>
            <View style={styles.headerRow}>
              <Text style={styles.tag}>QUESTÃO {currentIndex} DE {totalQuestions}</Text>

              <View style={styles.statusGroup}>
                <Text style={[styles.timerText, timeLeft <= 5 && styles.timerWarning]}>
                  ⏱ {timeLeft}s
                </Text>
                <Text style={styles.scoreCounter}>Acertos: {score}</Text>
              </View>
            </View>
            
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
            </View>
          </Animated.View>

          <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
            <Image
              source={DINO_IMAGES[currentImageIndex]}
              style={styles.image}
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View style={[styles.bottomSection, { opacity: fadeAnim }]}>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.option, getOptionStyle(option)]}
                  onPress={() => onOptionPress(option)}
                  disabled={isOptionsDisabled || selectedOption !== null}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, getOptionTextStyle(option)]}>
                    {String.fromCharCode(65 + index)}. {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>

          {selectedOption !== null && (
            <Animated.View style={[styles.overlayContainer, { opacity: overlayFadeAnim }]}>
              {isTimeOut ? (
                <View style={styles.timeOutContent}>
                  <Text style={styles.timeOutBadge}>TEMPO ESGOTADO!</Text>
                  <TouchableOpacity 
                    style={[styles.nextButton, styles.restartButton]} 
                    onPress={onRestartQuiz} 
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.nextButtonText, styles.restartButtonText]}>
                      ↺ REINICIAR QUIZ
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion} activeOpacity={0.85}>
                  <Text style={styles.nextButtonText}>
                    {currentIndex === totalQuestions ? 'VER RESULTADO ➔' : 'PRÓXIMA PERGUNTA ➔'}
                  </Text>
                </TouchableOpacity>
              )}
            </Animated.View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFEB',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 15,
    paddingVertical: 14,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#3B3024',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 20,
    backgroundColor: '#FAF7F0',
    justifyContent: 'space-between',
    position: 'relative',
  },
  topSection: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#D8CEBE',
    paddingBottom: 8,
  },
  tag: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#6B5A49',
    fontWeight: 'bold',
  },
  statusGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  timerText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  timerWarning: {
    color: '#D9381E',
    fontWeight: '900',
  },
  scoreCounter: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3B3024',
  },
  questionContainer: {
    paddingVertical: 4,
    paddingTop: 15,
  },
  questionText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#261F18',
    textAlign: 'center',
    lineHeight: 22,
  },
  imageContainer: {
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    width: '100%',
  },
  optionsContainer: {
    gap: 10,
  },
  option: {
    backgroundColor: '#FAF7F0',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.2,
    borderColor: '#3B3024',
  },
  optionText: {
    fontSize: 13,
    color: '#261F18',
    fontWeight: '600',
  },
  correctOption: {
    backgroundColor: '#DCE8D5',
    borderColor: '#3D6339',
  },
  correctText: {
    color: '#21401D',
    fontWeight: 'bold',
  },
  incorrectOption: {
    backgroundColor: '#F5DCD9',
    borderColor: '#94382E',
  },
  incorrectText: {
    color: '#5C1D17',
    fontWeight: 'bold',
  },
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(38, 31, 24, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  timeOutContent: {
    width: '100%',
    alignItems: 'center',
  },
  timeOutBadge: {
    color: '#FAF7F0',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 1.2,
  },
  nextButton: {
    backgroundColor: '#FAF7F0',
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3B3024',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: '#261F18',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
  restartButton: {
    backgroundColor: '#94382E', 
    borderColor: '#FAF7F0',
  },
  restartButtonText: {
    color: '#FAF7F0',
  },
});