
import { StyleSheet, View, Text } from 'react-native';
import ThemedButton from '../../components/custom/ThemedButton'

export default function HomeScreen() {
 

  return (
    <View>
      <Text>Hello</Text>
     <ThemedButton text='Submit' onPress={() => console.log('Button pressed!')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
