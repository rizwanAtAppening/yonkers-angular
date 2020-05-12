import { urls } from './url';
import { staticUrls } from './staticUrls';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const environment = {
  production: false,
 host: 'http://139.59.40.62:8083',
  // host: 'http://localhost:3000',

  ...urls,
  ...staticUrls,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
//  node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --configuration=dev

