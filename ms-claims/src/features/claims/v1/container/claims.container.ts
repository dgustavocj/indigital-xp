import { Container } from "inversify";
import TYPES from "../../../../utils/types";
import { ClaimsController } from "../controllers/claims.controller";
import { ClaimsService } from "../services/claims.service";
import { Database, PgClientBuilder } from "../../../../utils/postgresql";
import ClaimsRepository from "../repositories/claims.repository";


const claimContainer = new Container();
claimContainer.bind<Database>(TYPES.PgClient).toConstantValue(PgClientBuilder.getClient());

claimContainer.bind<ClaimsController>(TYPES.ClaimsController).to(ClaimsController);
claimContainer.bind<ClaimsService>(TYPES.ClaimsService).to(ClaimsService);
claimContainer.bind<ClaimsRepository>(TYPES.ClaimsRepository).to(ClaimsRepository);

export default claimContainer;