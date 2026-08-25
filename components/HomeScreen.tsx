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
          <Text style={styles.tag}>ESTUDO PALEONTOLÓGICO</Text>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  innerFrame: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#3B3024',
    padding: 45,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#261F18',
    textAlign: 'center',
    lineHeight: 28,
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
  infoCard: {
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#3B3024',
    paddingVertical: 10,
    gap: 6,
    marginBottom: 16,
  },
  infoText: {
    fontSize: 12,
    color: '#3B3024',
    textAlign: 'center',
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