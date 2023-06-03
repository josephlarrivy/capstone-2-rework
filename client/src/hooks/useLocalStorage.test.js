const localStorageMock = (() => {
  let store = {};

  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('localStoreToken should store the token in localStorage', () => {
    const [localStoreToken] = useLocalStorage();

    localStoreToken('test-token');

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'test-token');
  });
});

jest.mock('../apis/backendApi', () => ({
  decodeToken: jest.fn((token) => Promise.resolve(token)),
}));
