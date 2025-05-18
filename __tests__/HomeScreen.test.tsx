import React from 'react';
import renderer from 'react-test-renderer'; // 👈 Add this for snapshot testing
import { render, waitFor } from '@testing-library/react-native';
import HomeScreen from '../app/(tabs)/index';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { useRouter } from 'expo-router';

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  onAuthStateChanged: jest.fn(),
}));

// Mock navigation
jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
}));

// Mock StoreSearch to avoid testing it here
jest.mock('../app/pages/storesearch', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>Mock StoreSearch</Text>;
});

describe('HomeScreen', () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  it('redirects to /login if user is not logged in', async () => {
    const fakeUnsubscribe = jest.fn();
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(null); // simulate no user
      return fakeUnsubscribe;
    });

    render(<HomeScreen />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/login');
    });
  });

  it('redirects to /tabs if user is logged in', async () => {
    const fakeUnsubscribe = jest.fn();
    const mockUser = { uid: '123' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser); // simulate user
      return fakeUnsubscribe;
    });

    render(<HomeScreen />);

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('renders StoreSearch component', async () => {
    const fakeUnsubscribe = jest.fn();
    const mockUser = { uid: '123' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return fakeUnsubscribe;
    });

    const { getByText } = render(<HomeScreen />);
    expect(getByText('Mock StoreSearch')).toBeTruthy();
  });

  // ✅ Snapshot Test
  it('matches the snapshot', () => {
    const mockUser = { uid: '123' };
    (onAuthStateChanged as jest.Mock).mockImplementation((auth, callback) => {
      callback(mockUser);
      return jest.fn();
    });

    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
