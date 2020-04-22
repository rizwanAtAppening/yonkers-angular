import { urls } from './url';
import { staticUrls } from './staticUrls';

export const environment = {
  production: true,
  host: '',
  ...urls,
  ...staticUrls,
};
