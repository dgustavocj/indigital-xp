import path from 'path';
import { SwaggerRouter } from 'koa-swagger-decorator';
import claimContainer from '../container/claims.container';
import TYPES from '../../../../utils/types';
import { ClaimsController } from '../controllers/claims.controller';
import { validateRequest } from '../../../../middlewares/validateRequest';
import { getAllClaimsSchema } from '../models/dto/request/get-all-claims.request';
import { createClaimSchema } from '../models/dto/request/create-claim.request';
import { updateClaimSchema } from '../models/dto/request/update-claim.request';


const router = new SwaggerRouter();
const controller = claimContainer.get<ClaimsController>(TYPES.ClaimsController);
//const controller = new HealthController();

//router.get(controller.name, '/health', async ctx => await controller.healthCheck(ctx));
router.get('/claims', validateRequest({ params: getAllClaimsSchema }), async ctx => await controller.getAllClaims(ctx));
router.post('/claims', validateRequest({ body: createClaimSchema }), async ctx => await controller.createClaim(ctx));
router.put('/claims', validateRequest({ body: updateClaimSchema }), async ctx => await controller.updateClaim(ctx));

const controllersPath = path.join(__dirname, './controllers');
router.mapDir(controllersPath);

export default router;
