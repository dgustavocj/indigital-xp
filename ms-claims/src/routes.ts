import { SwaggerRouter } from 'koa-swagger-decorator';
import healthRoutes from './features/health/v1/route';
import claimsRoutes from './features/claims/v1/routes/claims.route';

// Crea un SwaggerRouter que extiende Koa Router
const router = new SwaggerRouter();

// Configuración del Swagger
router.swagger({
    title: 'business merchant API - OpenAPI 3.1',
    description: 'API Documentation for ms-backend-archetype API',
    version: '1.0.0',
    swaggerHtmlEndpoint: '/docs',
    swaggerJsonEndpoint: '/swagger-json'
  });


router.use(healthRoutes.routes());
router.use(claimsRoutes.routes());  

export { router };
