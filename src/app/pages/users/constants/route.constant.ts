import { USER_ROUTE } from 'src/app/constants/route.constants';

export const USER_LIST_ROUTE = {
  path: 'list',
  get url(): string {
    return `${USER_ROUTE.url}/${this.path}`;
  }
};

export const USER_DETAIL_ROUTE = {
  path: 'detail',
  get url(): string {
    return `${USER_ROUTE.url}/${this.path}`;
  }
};

