import { AddToCartInterface } from '../redux/slices';

export default class LocalRepository {
  static saveOnLocalStorage(key: string, data: Array<AddToCartInterface>) {
    if (data) {
      localStorage.setItem(key, JSON.stringify(data));
    } else {
      throw new Error('No hay datos para guardar');
    }
  }

  static getFromLocalStorage(key: string): Array<AddToCartInterface> {
    if (key) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : data;
    } else {
      throw new Error('Es necesaria la key');
    }
  }

  static deleteFromLocalStorage(key: string) {
    if (key) {
      localStorage.removeItem(key);
    } else {
      throw new Error('Es necesaria la key');
    }
  }
}
