import { Context } from "koa";
import { request, summary, tagsAll } from "koa-swagger-decorator";
import { HealthService } from './service';
import { inject, injectable } from "inversify";
import { catchError } from "../../../utils/decorators";
import TYPES from "../../../utils/types";
import { Healthy } from "../../../utils/healthcheck";


@tagsAll(['Health'])
@injectable()
export class HealthController {
    //name: string = 'health';


    constructor(@inject(TYPES.HealthService) private service: HealthService) {}
    
    @request('get', '/health')
	@summary('Get API health')
    @catchError()
	async healthCheck(ctx: Context): Promise<void> {
        const healthy: Healthy = await this.service.getIsHealthy();
   
        console.log(healthy.message as string);

        const response = {
            status: healthy.status,
            errors: healthy.errors
        };
        
        ctx.customResponse(response, healthy.message, healthy.statusCode, healthy.healty);
    }
}
