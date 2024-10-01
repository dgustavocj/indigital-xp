
import config from '../../../utils/config'
import { injectable } from 'inversify';
import { healthCheckerDecorator } from '../../../utils/healthcheck/decorators';
import { HealthCheck, HealthIndicator, Healthy } from '../../../utils/healthcheck';

@injectable()
export class HealthService {

    @healthCheckerDecorator()
    async serviceChecker(): Promise<any> {
        return await Promise.resolve(true);
    }

    async getIsHealthy(): Promise<Healthy> {
        const serviceChecker: HealthIndicator = await this.serviceChecker();
        const healthIndicators: HealthIndicator[] = [
            serviceChecker
        ];
        const healthCheck: HealthCheck = new HealthCheck(
            `${config().APP_NAME.name} api`, healthIndicators);
        return healthCheck.getIsHealthy();
    }
}