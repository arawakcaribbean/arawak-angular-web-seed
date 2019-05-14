import { KeycloakService } from 'keycloak-angular';
import { environment } from './environments/environment';
 
export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => keycloak.init(
    {
        config: {
          url: environment.IdentityConfig.url,
          realm: environment.IdentityConfig.realm,
          clientId: environment.IdentityConfig.clientId,
        },
        enableBearerInterceptor: true,
        bearerExcludedUrls: ['/assets', '/clients/public']
    }
  );
}