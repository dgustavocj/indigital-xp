import { Context, Next } from 'koa';
import { AnyZodObject, ZodIssue } from 'zod';
import { StatusCodes } from 'http-status-codes';

type ErrorListItem = { type: 'query' | 'params' | 'body'; errors: ZodIssue[] };

export const validateRequest = (options: {
	body?: AnyZodObject;
	params?: AnyZodObject;
	query?: AnyZodObject;
}) => {
	return async (ctx: Context, next: Next) => {
		const errors: ErrorListItem[] = [];

		// Validar los parámetros de consulta si se proporciona un esquema
		if (options.query) {
			const parsed = await options.query.safeParseAsync(ctx.request.query);

			if (!parsed.success) {
				errors.push({ type: 'query', errors: parsed.error.issues });
			}
		}

		// Validar los parámetros de la URL si se proporciona un esquema
		if (options.params) {
			const parsed = await options.params.safeParseAsync(ctx.params);

			if (!parsed.success) {
				errors.push({ type: 'params', errors: parsed.error.issues });
			}
		}

		// Validar el cuerpo de la solicitud si se proporciona un esquema
		if (options.body) {
			const parsed = await options.body.safeParseAsync(ctx.request.body);

			if (!parsed.success) {
				errors.push({ type: 'body', errors: parsed.error.issues });
			}
		}

		if (errors.length) {
            ctx.status = StatusCodes.BAD_REQUEST;
			ctx.body = {
                success: false,
                error: {
                    name: 'BadRequestException',
                    message: errors.reduce(
                        (acc, curr) => {
                            for (const error of curr.errors) {
                                acc[`${curr.type}.${error.path.join('.')}`] = error.message;
                            }
                            return acc;
                        },
                        {} as Record<string, string>,
                    ),
                },
            };
            return;
		}

		await next(); // Pasar al siguiente middleware o controlador
	};
};
