import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Store from '../app/pages/store'; 
import Favorites from '../app/(tabs)/favorites';
import { useLocalSearchParams } from 'expo-router';
import * as firestore from 'firebase/firestore';

// Mock route params
jest.mock('expo-router', () => ({
  useLocalSearchParams: jest.fn(),
  useRouter: () => ({ push: jest.fn() }),
}));

jest.mock('../app/firebaseConfig', () => ({
  db: {},
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  addDoc: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  onSnapshot: jest.fn(),
}));

describe('Favorites UI flow', () => {
  const mockStoreData = {
    id: '123',
    name: 'Test Store',
    address: '123 Main St',
    phone: '123-456-7890',
    openingHours: '9:00 AM',
    closingHours: '5:00 PM',
    latitude: 12.34,
    longitude: 56.78,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLocalSearchParams as jest.Mock).mockReturnValue(mockStoreData);
  });

  it('adds store to favorites and appears in Favorites screen', async () => {
    // Mock Firestore getDocs initially returning empty (not favorite)
    (firestore.getDocs as jest.Mock).mockResolvedValueOnce({ docs: [] });

    const addDocMock = firestore.addDoc as jest.Mock;
    addDocMock.mockResolvedValueOnce({ id: 'newDocId' });

    const { getByText, queryByText } = render(<Store />);
    
    // Button should be visible
    const addButton = getByText('Add to Favorites');
    fireEvent.press(addButton);

    // Simulate Firestore snapshot for Favorites screen
    (firestore.onSnapshot as jest.Mock).mockImplementation((_, onSuccess) => {
      onSuccess({
        docs: [
          {
            data: () => mockStoreData,
          },
        ],
      });
      return jest.fn(); // unsubscribe mock
    });

    // Render Favorites screen
    const { getByText: getByTextFav } = render(<Favorites />);

    await waitFor(() => {
      expect(getByTextFav('Test Store')).toBeTruthy();
      expect(getByTextFav('123 Main St')).toBeTruthy();
    });
  });
});
