import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

type Coordinates = {
  latitude: number;
  longitude: number;
};

export function useCurrentLocation() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  return { location, errorMsg };
}
