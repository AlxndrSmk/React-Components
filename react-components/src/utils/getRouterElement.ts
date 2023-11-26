import { RouterElement } from '@/types/types';

const getRouterElement = (el: RouterElement, defaultValue: unknown) => {
  return Array.isArray(el) ? el[0] : el ? el : defaultValue;
};

export default getRouterElement;
