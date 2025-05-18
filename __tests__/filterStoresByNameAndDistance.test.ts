import { filterStoresByNameAndDistance } from '../utils/filterStores';
import { Store } from '../utils/filterStores';

describe('filterStoresByNameAndDistance', () => {
  const mockStores: Store[] = [
    {
      id: '1',
      name: 'ShoeGalaxy',
      latitude: -37.8136,
      longitude: 144.9631,
      address: '101 Footwear Ln',
      phone: '123-456',
      openingHours: '9:00',
      closingHours: '17:00',
    },
    {
      id: '2',
      name: 'SneakerHub',
      latitude: -37.8200,
      longitude: 144.9500,
      address: '202 Sole St',
      phone: '789-012',
      openingHours: '8:00',
      closingHours: '18:00',
    },
    {
      id: '3',
      name: 'ShoePlanet',
      latitude: -37.8205,
      longitude: 144.9405,
      address: '303 Lace Ave',
      phone: '345-678',
      openingHours: '7:00',
      closingHours: '16:00',
    },
  ];

  const mockLocation = {
    latitude: -37.8136,
    longitude: 144.9631,
  };

  it('returns stores that match search query and are within radius', () => {
    const result = filterStoresByNameAndDistance(
      mockStores,
      'Shoe',
      mockLocation,
      5000 // 5 km radius
    );

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('ShoeGalaxy');
    expect(result[1].name).toBe('ShoePlanet');
  });

  it('returns empty array when no stores match search query', () => {
    const result = filterStoresByNameAndDistance(
      mockStores,
      'Boots',
      mockLocation,
      5000
    );

    expect(result).toHaveLength(0);
  });

  it('excludes stores outside of radius', () => {
    const farLocation = {
      latitude: -37.9000, // far from all stores
      longitude: 145.0000,
    };

    const result = filterStoresByNameAndDistance(
      mockStores,
      'Shoe',
      farLocation,
      1000 // 1 km radius
    );

    expect(result).toHaveLength(0);
  });
});
