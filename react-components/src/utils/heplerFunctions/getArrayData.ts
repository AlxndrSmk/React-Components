import { IFilmData, ISpecieData, IStarshipData, IVehicleData } from '../../types/types';

const getArrayData = async (
  links: string[]
): Promise<IFilmData[] | ISpecieData[] | IStarshipData[] | IVehicleData[]> => {
  const promises = links.map(async (link) => {
    const response = await fetch(link);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    return await response.json();
  });

  const data = await Promise.all(promises);
  return data;
};

export default getArrayData;
