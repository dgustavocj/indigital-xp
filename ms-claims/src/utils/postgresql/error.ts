export class PostgresError extends Error {
	name: string;

	message: string;

	cause: any;

	constructor({
		name,
		message,
		cause,
	}: {
		name: string;
		message: string;
		cause?: any;
	}) {
		super();
		this.name = name;
		this.message = message;
		this.cause = cause;
	}
}
