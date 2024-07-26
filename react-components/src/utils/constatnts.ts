import { IFooterLink } from '../types/types';

export const initItemData = {
  name: '',
  height: '',
  mass: '',
  hair_color: '',
  skin_color: '',
  eye_color: '',
  birth_year: '',
  gender: '',
  homeworld: '',
  films: [],
  species: [],
  vehicles: [],
  starships: [],
  created: '',
  edited: '',
  url: '',
};

export const initListData = {
  count: 0,
  next: '',
  previous: null,
  results: [initItemData],
};

export const footerLinks: IFooterLink[] = [
  {
    name: 'Github',
    src: 'https://github.com/AlxndrSmk',
    path: '/images/icons/svg/github.svg',
    width: '40',
  },
  {
    name: 'RSSchool',
    src: 'https://rs.school/js/',
    path: '/images/icons/svg/rs_school_js.svg',
    width: '80',
  },
];
