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
    console.log("returning value : ", this.store.get(key), " for key: ", key)
    return this.store.get(key) || null;
  }

  async set(key: string, value: T): Promise<void> {
    console.log("Setting value : ", value, " for key: ", key)
    this.store.set(key, value);
  }
}

const memstorage = new InMemoryStorage<any>

class ChromeLocalStorage<T> implements Storage<T> {
  async get(key: string): Promise<T | null> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        resolve(result[key] || null);
      });
    });
  }

  async set(key: string, value: T): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  }
}

const storage = new ChromeLocalStorage<any>();

export default storage;
