import { getDistance } from 'geolib';

export type Store = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  phone: string;
  openingHours: string;
  closingHours: string;
};


export function filterStoresByNameAndDistance(
  stores: Store[],
  searchQuery: string,
  userLocation: { latitude: number; longitude: number } | null,
  maxDistanceMeters: number = 5000 
): Store[] {
  let filtered = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (userLocation) {
    filtered = filtered.filter((store) => {
      const distance = getDistance(
        { latitude: store.latitude, longitude: store.longitude },
        userLocation
      );
      return distance <= maxDistanceMeters; 
    });
  }

  return filtered;
}

export const convertToMeters = (radiusInKm: number) => radiusInKm * 1000;
