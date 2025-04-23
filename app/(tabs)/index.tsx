
import { StyleSheet, View, Text } from 'react-native';
import MapView, {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import ThemedButton from '../../components/custom/ThemedButton'

export default function HomeScreen() {

  const RADIUS = 300;

  const markers = [
    {
      coordinate:{
        latitude: -37.809970468810995,
        longitude :  144.96313006932527,
      },
      title: 'Nike',
      description: 'Melbourne Central'
    }
  ]
 

  const renderMarkers = () =>{
    return markers.map((marker, index) =>
      <Marker
      key={index}
      coordinate={marker.coordinate}
      title={marker.title}
      description={marker.description}
      />
    )
  }
  return (
    <View style={styles.screen}>
      <Text>Hello</Text>
   
     <View style={styles.mapContainer}>
     <MapView 
     provider={PROVIDER_GOOGLE}
     style={styles.map} 
     initialRegion={{
      latitude:-37.81,
      longitude: 144.96,
      latitudeDelta:0.01,
      longitudeDelta:0.01,
     }}
     >

      {renderMarkers()}
      <Circle 
      center={{
        latitude:-37.721407,
        longitude: 145.046530
      }}
      radius={200}
      >


      </Circle>
     </MapView>
     </View>
       <ThemedButton text='Submit' onPress={() => console.log('Button pressed!')}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  mapContainer:{
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
