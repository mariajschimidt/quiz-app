import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
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
};

export default function QuizScreenTeste({
  currentQuestion,
  currentIndex,
  totalQuestions,
  score,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
}: QuizScreenProps) {

  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) return styles.correctOption;
      if (option === selectedOption && !isCorrect) return styles.incorrectOption;
    }
    return {};
  };

  const getOptionTextStyle = (option: string) => {
    if (selectedOption) {
      if (option === currentQuestion.correctAnswer) return styles.correctText;
      if (option === selectedOption) return styles.incorrectText;
    }
    return {};
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.innerFrame}>
        
          <View style={styles.topSection}>
            <View style={styles.headerRow}>
              <Text style={styles.tag}>✦ QUESTÃO {currentIndex} DE {totalQuestions} ✦</Text>
              <Text style={styles.scoreCounter}>Acertos: {score}</Text>
            </View>
            
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>{currentQuestion.question}</Text>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/img/dinossauro1.png')}
              style={styles.image}
              resizeMode="contain"
            />
          </View>

          <View style={styles.bottomSection}>
            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={[styles.option, getOptionStyle(option)]}
                  onPress={() => onOptionPress(option)}
                  disabled={isOptionsDisabled}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.optionText, getOptionTextStyle(option)]}>
                    {String.fromCharCode(65 + index)}.  {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {selectedOption && (
              <TouchableOpacity style={styles.nextButton} onPress={onNextQuestion} activeOpacity={0.8}>
                <Text style={styles.nextButtonText}>
                  {currentIndex === totalQuestions ? 'VER RESULTADO ➔' : 'PRÓXIMA PERGUNTA ➔'}
                </Text>
              </TouchableOpacity>
            )}
          </View>

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
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#3B3024',
    padding: 14,
    backgroundColor: '#FAF7F0',
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  topSection: {
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#D8CEBE',
    paddingBottom: 4,
  },
  tag: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: '#6B5A49',
    fontWeight: 'bold',
  },
  scoreCounter: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#3B3024',
  },
  questionContainer: {
    paddingVertical: 4,
  },
  questionText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#261F18',
    textAlign: 'center',
    lineHeight: 20,
  },
  imageContainer: {
    width: '100%',
    minHeight: 80,
    maxHeight: 135,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    width: '100%',
  },
  optionsContainer: {
    gap: 6,
    marginBottom: 4,
  },
  option: {
    backgroundColor: '#FAF7F0',
    paddingVertical: 10,
    paddingHorizontal: 12,
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
  nextButton: {
    backgroundColor: '#261F18',
    paddingVertical: 11,
    alignItems: 'center',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#3B3024',
  },
  nextButtonText: {
    color: '#FAF7F0',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});