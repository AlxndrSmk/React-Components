import { ReactNode } from 'react';

export type TAllCardsData =
  | null
  | IPersonData[]
  | IPlanetData[]
  | IFilmData[]
  | ISpecieData[]
  | IVehicleData[]
  | IStarshipData[];

export type TAllCardsDataWithName =
  | IPersonData
  | IPlanetData
  | ISpecieData
  | IVehicleData
  | IStarshipData;

export interface ISearchInputProps {
  handleSubmit: (inputValue: string) => void;
}

export interface IListProps {
  decrementPage: () => void;
  handleSubmit: (searchString: string) => void;
  incrementPage: () => void;
  handleSelectChange: (value: string) => void;
  isDataLoaded: boolean;
  listData: IListData;
  pathName: string;
  currentPage: number;
  perPage: string;
  searchString: string;
}

export interface IAttributesBlockProps {
  data: TAttributesBlockPropsData;
  title: string;
  classNames: string[];
  isLink?: boolean;
}

export type TAttributesBlockPropsData =
  | IPersonData[]
  | IPlanetData[]
  | IFilmData[]
  | ISpecieData[]
  | IVehicleData[]
  | IStarshipData[]
  | string[];

export interface IListData {
  count: number;
  next: string;
  previous: null;
  results: TAllCardsData;
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

export interface IPlanetData {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface IFilmData {
  title: string;
  episodeID: number;
  openingCrawl: string;
  director: string;
  producer: string;
  releaseDate: Date;
  characters: IPersonData[];
  planets: IPlanetData[];
  starships: IStarshipData[];
  vehicles: IVehicleData[];
  species: ISpecieData[];
  created: Date;
  edited: Date;
  url: string;
  opening_crawl: string;
  release_date: string;
}

export interface ISpecieData {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: null | string;
  language: string;
  people: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}
export interface IVehicleData {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface IStarshipData {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: Date;
  edited: Date;
  url: string;
}

export interface IFooterLink {
  name: string;
  src: string;
  path: string;
  width: string;
}

export interface IListDataProvider {
  children: ReactNode;
}

export interface IListDataContext {
  listData: IListData | [];
  searchString: string;
  saveListData: (data: IListData) => Promise<void>;
  saveSearchString: (data: string) => Promise<void>;
}

export interface ICardProps {
  path: string;
  imgSrc: string;
  data: TAllCardsDataWithName | IFilmData;
}
