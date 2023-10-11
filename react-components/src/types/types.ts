export interface IPersonProps {
  params: IPersonParams;
  location: IPersonLocation;
}

export interface IPersonLocation {
  pathname: string;
  search: string;
  hash: string;
  state: null;
  key: string;
}

export interface IPersonParams {
  id: string;
}

export interface IPersonState {
  personData: null | IPersonData;
  homeworldData: null | IHomeWorldData;
  isDataLoaded: boolean;
}

export interface IPersonData {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface IHomeWorldData {
  name: string;
  rotationPeriod: string;
  orbitalPeriod: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surfaceWater: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: RegExpMatchArray | null;
}
