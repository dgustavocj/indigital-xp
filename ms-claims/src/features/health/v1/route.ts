import path from 'path';
import { HealthController } from './controller';
import { SwaggerRouter } from 'koa-swagger-decorator';
import healthContainer from './container';
import TYPES from '../../../utils/types';


const router = new SwaggerRouter();
const controller = healthContainer.get<HealthController>(TYPES.HealthController);
//const controller = new HealthController();

//router.get(controller.name, '/health', async ctx => await controller.healthCheck(ctx));
router.get('/health', async ctx => await controller.healthCheck(ctx));

// Carga automática de rutas y documentación Swagger
const controllersPath = path.join(__dirname, './controllers');
router.mapDir(controllersPath);

export default router;
