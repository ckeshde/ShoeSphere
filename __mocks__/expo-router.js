// __mocks__/expo-router.js
export const useRouter = () => ({
  push: jest.fn(),
});
export const useLocalSearchParams = jest.fn(() => ({}));
