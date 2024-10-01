import { Context } from 'koa';
import { StatusCodes } from 'http-status-codes';

interface ErrorOptions {
	name: string;
	httpStatus: (typeof StatusCodes)[keyof typeof StatusCodes];
}

export abstract class HTTPException extends Error {
	readonly httpStatus: (typeof StatusCodes)[keyof typeof StatusCodes];

	constructor(message: string, options: ErrorOptions) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.name = options.name;
		this.httpStatus = options.httpStatus;

		Error.captureStackTrace(this);
	}

	toResponse(ctx: Context): void {
		ctx.status = this.httpStatus || StatusCodes.INTERNAL_SERVER_ERROR;
		ctx.body = {
			success: false,
			message: this.message,
			data: {
				error: {
					name: this.name
				}
			}
		};
	}
}

