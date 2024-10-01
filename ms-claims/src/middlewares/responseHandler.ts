import { Context, Next } from 'koa';
import { StatusCodes } from 'http-status-codes';

const setResponse = (ctx: Context, status: (typeof StatusCodes)[keyof typeof StatusCodes], message: string, body: unknown, success: boolean = true) => {
	if (body === null || body === undefined || (Array.isArray(body) && body.length === 0)) {
		ctx.state.message = 'No Content';
		ctx.status = StatusCodes.NO_CONTENT;
	} else {
		ctx.status = status;
		ctx.state.message = message;
		ctx.body = {
			success: success,
			message: message,
			data: body,
		};
	}
};

export const responseHandler = async (ctx: Context, next: Next): Promise<void> => {
	ctx.customResponse = (body: unknown, message: string, statusCode: number, success: boolean) => {
		setResponse(ctx, statusCode, message, body, success);
	};

	ctx.ok = (body: unknown, message = 'OK') => {
		setResponse(ctx, StatusCodes.OK, message, body);
	};
	
	ctx.created = (body: unknown, message = 'Created') => {
		setResponse(ctx, StatusCodes.CREATED, message, body);
	};

	await next();
};