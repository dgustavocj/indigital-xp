import { StatusCodes } from 'http-status-codes';
import { HTTPException } from './base';

export class ErrorException extends HTTPException {
	constructor(name: string, message: string, httpStatus: number) {
		super(message, {
			name: name,
			httpStatus: httpStatus,
		});
	}
}

export class BadRequestException extends HTTPException {
	constructor(message: string) {
		super(message, {
			name: 'BadRequestException',
			httpStatus: StatusCodes.BAD_REQUEST,
		});
	}
}

export class UnauthorizedException extends HTTPException {
	constructor(message: string) {
		super(message, {
			name: 'UnauthorizedException',
			httpStatus: StatusCodes.UNAUTHORIZED,
		});
	}
}

export class ForbiddenException extends HTTPException {
	constructor(message: string) {
		super(message, {
			name: 'ForbiddenException',
			httpStatus: StatusCodes.FORBIDDEN,
		});
	}
}

export class NotFoundException extends HTTPException {
	constructor(message: string) {
		super(message, {
			name: 'NotFoundException',
			httpStatus: StatusCodes.NOT_FOUND,
		});
	}
}

export class ConflictException extends HTTPException {
	constructor(message: string) {
		super(message, {
			name: 'ConflictException',
			httpStatus: StatusCodes.CONFLICT,
		});
	}
}

