import { urls } from './url';
import { staticUrls } from './staticUrls';

export const environment = {
  production: true,
  host: 'http://139.59.40.62:8083',
    ...urls,
  ...staticUrls,
};
