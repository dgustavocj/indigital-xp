import { Context } from "koa";
import { request, summary, tagsAll } from "koa-swagger-decorator";

import { catchError } from '../../../../utils/decorators';
import { inject, injectable } from "inversify";
import TYPES from "../../../../utils/types";
import { ClaimsService } from "../services/claims.service";


@tagsAll(['Claims'])
@injectable()
export class ClaimsController {
    //name: string = 'claims';
    
    constructor(@inject(TYPES.ClaimsService) private service: ClaimsService) {}

    @request('get', '/claims')
	@summary('Get all claims')
    @catchError()
	async getAllClaims(ctx: Context): Promise<void> {
        console.log('ctx.params: ', ctx.request.query);
        const { id } = ctx.request.query as { id: string }
        const result = await this.service.getAllClaims(id);

        const response = {
            data: result,
            length: result.length
        };

        ctx.customResponse(response, 'Claims retrieved successfully', 200, true);

    }

    @request('post', '/claims')
	@summary('Create a claim')
    @catchError()
    async createClaim(ctx: Context): Promise<void> {
        console.log('ctx.request.body: ', ctx.request.body);
        const result = await this.service.createClaim(ctx.request.body);
        ctx.customResponse(result, 'Claim created successfully', 201, true);
        
    }

    @request('put', '/claims')
    @summary('Update a claim')
    @catchError()
    async updateClaim(ctx: Context): Promise<void> {
        console.log('ctx.request.body: ', ctx.request.body);
        const result = await this.service.updateClaim(ctx.request.body);
        ctx.customResponse(result, 'Claim updated successfully', 200, true);
    }
}