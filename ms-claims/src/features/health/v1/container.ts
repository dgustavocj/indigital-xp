import { Container } from "inversify";
import { Database, PgClientBuilder } from "../../../utils/postgresql";
import { HealthController } from "./controller";
import { HealthService } from "./service";
import TYPES from "../../../utils/types";

const healthContainer = new Container();
healthContainer.bind<Database>(TYPES.PgClient).toConstantValue(PgClientBuilder.getClient());

healthContainer.bind<HealthService>(TYPES.HealthService).to(HealthService);
healthContainer.bind<HealthController>(TYPES.HealthController).to(HealthController);

export default healthContainer;