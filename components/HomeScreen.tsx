import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type HomeScreenProps = {
  onStart: () => void;
};

export default function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom', 'left', 'right']}>
      <View style={styles.innerFrame}>
        
        <View style={styles.header}>
          <Text style={styles.tag}>✦ ESTUDO PALEONTOLÓGICO ✦</Text>
          <Text style={styles.title}>QUIZ DE{'\n'}DINOSSAUROS</Text>
          <Text style={styles.subtitle}>Arquivo de Espécimes & Fósseis</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/img/dinossauro1.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>• 10 Perguntas Sorteadas</Text>
            <Text style={styles.infoText}>• Fósseis & Anatomia</Text>
            <Text style={styles.infoText}>• Teste seus Conhecimentos</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onStart} activeOpacity={0.8}>
            <Text style={styles.buttonText}>INICIAR EXPEDIÇÃO</Text>
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
    paddingHorizontal: 22,
    paddingVertical: 18,
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
  },
  tag: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#6B5A49',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#261F18',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 2,
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
    minHeight: 110,
    maxHeight: 180,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  bottomSection: {
    width: '100%',
  },
  infoCard: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#3B3024',
    paddingVertical: 8,
    gap: 3,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 12,
    color: '#3B3024',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#261F18',
    paddingVertical: 12,
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
