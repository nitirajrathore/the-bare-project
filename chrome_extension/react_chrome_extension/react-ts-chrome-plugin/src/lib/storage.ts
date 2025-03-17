// Storage interface and implementation

export interface Storage<T = any> {
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
}

class InMemoryStorage<T> implements Storage<T> {
  private store: Map<string, T>;

  constructor() {
    this.store = new Map<string, T>();
  }

  async get(key: string): Promise<T | null> {
    return this.store.get(key) || null;
  }

  async set(key: string, value: T): Promise<void> {
    this.store.set(key, value);
  }
}

const storage = new InMemoryStorage<any>

export default storage;

//     chrome.storage.sync.set({ username, theme }, () => {
//   alert('Settings saved!');
// });
