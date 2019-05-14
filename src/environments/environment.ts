// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:`https://api.opencaribbean.org/api/v${1.0}/`,
  staticUrl:'http://static-media.opencaribbean.org/',
  playTour:'playtour',
  location:'location',
  booking:'booking',
  reviews:'review',
  claim:'claim',
  idApp:"web-app",
  mapbox:{
    accessToken: 'pk.eyJ1IjoieWFzaWVscHYxNTAzIiwiYSI6ImNqdGhtdTZpajBiZWo0NGxxM3FlaGs2dzYifQ.57OF-8o2iY5fPpSPbWzZkw', // Optionnal, can also be set per map (accessToken input of mgl-map)
  },
  IdentityConfig : {        
    url: "https://console.opencaribbean.org/auth",
    clientId: "arawaks-web-local",      
    realm: "arawaks",    
  }   
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
