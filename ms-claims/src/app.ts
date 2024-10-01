import 'reflect-metadata';
import Koa from 'koa';
import { bodyParser } from '@koa/bodyparser';
import cors from '@koa/cors';
import logger from 'koa-logger';
import { errorHandler } from './middlewares/errorHandler';
import { responseHandler } from './middlewares/responseHandler';
import { router } from './routes';
import { getEndpoints } from './utils/endpoint';

const app = new Koa();

app.use(errorHandler);
app.use(responseHandler);
app.use(bodyParser());
app.use(logger());
app.use(cors({ origin: '*' }));
app.use(router.routes());

// Save endpoint list
app.context.endpoints = getEndpoints(router.stack);

export default app;