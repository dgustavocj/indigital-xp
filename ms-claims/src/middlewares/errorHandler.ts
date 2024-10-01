import { Context, Next } from 'koa';
import { HTTPException } from '../errors/base';

export const errorHandler = async (ctx: Context, next: Next): Promise<void> => {
	try {
		await next();
	} catch (error) {
		if (error instanceof HTTPException) {
			error.toResponse(ctx);
		}
	}
};