import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import questions from '../questions.json';

export default function QuizScreen() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    setCurrentQuestionIndex((previousIndex) => {
      const nextIndex = previousIndex + 1;

      return nextIndex >= questions.length ? 0 : nextIndex;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.option}
            onPress={handleAnswer}
          >
            <Text style={styles.optionText}> {option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E2F23',
    padding: 16,
  },
  questionContainer: {
    flex: 1,
    backgroundColor: '#2A1A0A', 
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#C28243', 
    padding: 20,
    justifyContent: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#F4E8C1',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  option: {
    backgroundColor: '#2E4031',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3E5C43', 
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F4E8C1', 
  },
});