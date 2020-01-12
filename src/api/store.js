export default class Store {
  constructor(storeName, storage) {
    this._storage = storage;
    this._storeName = storeName;
  }

  clear() {
    this._storage.setItem(
        this._storeName,
        JSON.stringify({})
    );
  }

  getAll() {
    try {
      return JSON.parse(this._storage.getItem(this._storeName));
    } catch (err) {
      return {};
    }
  }

  getItem(key) {
    const store = this.getAll();
    return store[key];
  }

  setItem(key, value) {
    const store = this.getAll();

    this._storage.setItem(
        this._storeName,
        JSON.stringify(
            Object.assign({}, store, {[key]: value})
        )
    );
  }

  removeItem(key) {
    const store = this.getAll();

    delete store[key];

    this._storage.setItem(
        this._storeName,
        JSON.stringify(
            Object.assign({}, store)
        )
    );
  }
}
