import { HttpResponse, delay, http } from 'msw';
import { listDataMocks } from './listDataMocks';

export const handlers = [
  http.get('https://swapi.dev/api/people', async () => {
    await delay(150);
    return HttpResponse.json(listDataMocks);
  }),
];
