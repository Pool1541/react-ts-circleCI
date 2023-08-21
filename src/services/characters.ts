import { instance } from './base';

const endpoint = 'character';

export function getCharacters(page?: number) {
  return instance.get(endpoint, {
    params: {
      page,
    },
  });
}

export function getCharacterById(id: number | string) {
  return instance.get(`${endpoint}/${id}`);
}
