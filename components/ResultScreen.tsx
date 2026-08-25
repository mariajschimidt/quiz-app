import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

export default function ResultScreen({ score, totalQuestions, onPlayAgain }: ResultScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100);

  let feedbackMessage = 'Continue explorando os dinossauros!';
  if (percentage >= 80) {
    feedbackMessage = 'Excelente! Um verdadeiro mestre paleontólogo!';
  } else if (percentage >= 50) {
    feedbackMessage = 'Muito bem! Bom conhecimento de dinossauros!';
  }

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.innerFrame}>

        <View style={styles.header}>
          <Text style={styles.tag}>✦ RELATÓRIO FINAL ✦</Text>
          <Text style={styles.title}>EXPEDIÇÃO CONCLUÍDA</Text>
          <Text style={styles.subtitle}>Avaliação Paleontológica</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/img/dinossauro1.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreNumber}>{score} / {totalQuestions}</Text>
            <Text style={styles.scoreDetail}>Taxa de Acerto: {percentage}%</Text>
            <Text style={styles.feedbackText}>{feedbackMessage}</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onPlayAgain} activeOpacity={0.8}>
            <Text style={styles.buttonText}>JOGAR NOVAMENTE</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFEB',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#3B3024',
    padding: 16,
    backgroundColor: '#FAF7F0',
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 8,
  },
  tag: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#6B5A49',
    fontWeight: 'bold',
    marginBottom: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#261F18',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: '#5E5042',
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    width: '100%',
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
  scoreCard: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#3B3024',
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#261F18',
  },
  scoreDetail: {
    fontSize: 13,
    color: '#6B5A49',
    fontWeight: 'bold',
  },
  feedbackText: {
    fontSize: 12,
    color: '#3B3024',
    textAlign: 'center',
    marginTop: 4,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#261F18',
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3B3024',
  },
  buttonText: {
    color: '#FAF7F0',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1.2,
  },
});