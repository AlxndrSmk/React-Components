import fetch from 'node-fetch';
import { IPersonData, TAllCardsData } from '../../types/types';

const getArrayData = async (links: string[]): Promise<TAllCardsData> => {
  const promises = links.map(async (link) => {
    const response = await fetch(link);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return await response.json();
  });

  const data = await Promise.all(promises);
  return data as IPersonData[];
};

export default getArrayData;
