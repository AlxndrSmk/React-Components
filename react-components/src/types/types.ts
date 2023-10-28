export type TAllCardsData =
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

export interface ISearchInputState {
  inputValue: string;
}

export interface ISearchInputProps {
  handleSubmit: (inputValue: string) => void;
}

export interface IAppState {
  currentPage: number;
  listData: null | TAllCardsData;
  pathName: string;
  isDataLoaded: boolean;
  searchString: string;
}

export interface IAppProps {
  location: ILocation;
  navigate: (to: string) => void;
}

export interface IListState {
  incrementPage: () => void;
  decrementPage: () => void;
  handleSubmit: () => void;
  isDataLoaded: boolean;
  data: IListData;
}

export interface IListProps {
  decrementPage: () => void;
  handleSubmit: (searchString: string) => void;
  incrementPage: () => void;
  isDataLoaded: boolean;
  listData: IListData;
  location: ILocation;
  params: object;
  pathName: string;
}

export interface IAttributesBlockState {
  itemsPerPage: number;
  currentPage: number;
  fetchedData:
    | null
    | IPersonData[]
    | IPlanetData[]
    | IFilmData[]
    | ISpecieData[]
    | IVehicleData[]
    | IStarshipData[];
}

export interface IAttributesBlockProps {
  data: TAttributesBlockPropsData;
  title: string;
  classNames: string[];
}

export type TAttributesBlockPropsData =
  | IPersonData[]
  | IPlanetData[]
  | IFilmData[]
  | ISpecieData[]
  | IVehicleData[]
  | IStarshipData[]
  | string[];

export interface IPersonState {
  itemData: null | IPersonData;
  planetData: null | IPlanetData;
  speciesData: null | ISpecieData;
}

export interface IPersonProps {
  params: IParams;
  location: ILocation;
}

export interface IPlanetState {
  planetData: null | IPlanetData;
}

export interface IPlanetProps {
  params: IParams;
  location: ILocation;
}

export interface IFilmState {
  filmData: null | IFilmData;
}

export interface IFilmProps {
  params: IParams;
  location: ILocation;
}

export interface ISpecieState {
  planetData: null | IPlanetData;
  specieData: null | ISpecieData;
}

export interface ISPecieProps {
  params: IParams;
  location: ILocation;
}

export interface IVehicleState {
  vehicleData: null | IVehicleData;
}

export interface IVehicleProps {
  params: IParams;
  location: ILocation;
}

export interface IStarshipState {
  starshipData: null | IStarshipData;
}

export interface IStarshipProps {
  params: IParams;
  location: ILocation;
}

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

interface IParams {
  id: string;
}

interface ILocation {
  hash: string;
  string?: string;
  key: string;
  pathname: string;
  search: string;
}

export interface IHeaderProps {
  location: ILocation;
}

export interface IFooterLink {
  name: string;
  src: string;
  path: string;
  width: string;
}

export interface WithRouterProps {
  children?: React.ReactNode;
  handleSubmit?: (searchString: string) => void;
  listData?: null | TAllCardsData;
  isDataLoaded?: boolean;
  incrementPage?: () => void;
  decrementPage?: () => void;
  pathName?: string;
}
