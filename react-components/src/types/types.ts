export interface IListData {
  count: number;
  next: string;
  previous: null;
  results:
    | IPersonData[]
    | IPlanetData[]
    | IFilmData[]
    | ISpecieData[]
    | IVehicleData[]
    | IStarshipData[];
}

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
  itemData: null | IPersonData;
  planetData: null | IPlanetData;
  filmsData: null | IFilmData;
  speciesData: null | ISpecieData;
  starshipsData: null | IStarshipData;
  vehiclesData: null | IVehicleData;
}

export interface IPlanetProps {
  params: IPlanetParams;
  location: IPlanetLocation;
}

export interface IPlanetLocation {
  pathname: string;
  search: string;
  hash: string;
  state: null;
  key: string;
}

export interface IPlanetParams {
  id: string;
}

export interface IPlanetState {
  planetData: null;
  filmsData: null;
  residentsData: null;

  itemData: null | IPersonData;
  planetData: null | IPlanetData;
  filmsData: null | IFilmData;
  speciesData: null | ISpecieData;
  starshipsData: null | IStarshipData;
  vehiclesData: null | IVehicleData;
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

export interface IListProps {
  incrementPage: () => void;
  decrementPage: () => void;
  isDataLoaded: boolean;
  data: IListData;
}

export interface IListState {}
