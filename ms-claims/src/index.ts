import 'reflect-metadata';


import config from './utils/config';
import { HealthService } from './features/health/v1/service';
import { Healthy } from './utils/healthcheck';


// Main function of the application
const main = async () => {
  let configFromSecretsManager: Record<string, string> | undefined;

  try {
    // Environment Setter
    //dotenv.config();
    
    // Application variable definition
    const app = await import('./app');

    const healthy: Healthy = await (new HealthService().getIsHealthy());

    if ( !healthy.healty ) {
      throw new Error(healthy.message);
    }

    // Run application
    app.default.listen(config().PORT, async () => {
      console.log(`When it's ${new Date().toLocaleString()} we are getting ready`);
      console.log(`Starting in ${config().APP_ENV} mode`);
      console.log(`Listening on http://localhost:${config().PORT}`);
      console.log(healthy.message as string);
    });

  } catch (error: any) {
    console.log(error.message);
  }
};

// Execute main function of the application
main();
