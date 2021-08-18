import { PROPERTY_ROUTE } from 'src/app/constants/route.constants';

export const PROPERTY_LIST_ROUTE = {
  path: 'list',
  get url(): string {
    return `${PROPERTY_ROUTE.url}/${this.path}`;
  }
};

export const PROPERTY_DETAIL_ROUTE = {
  path: 'detail',
  get url(): string {
    return `${PROPERTY_ROUTE.url}/${this.path}`;
  }
};

