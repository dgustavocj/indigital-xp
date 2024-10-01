import { inject, injectable } from "inversify";
import TYPES from "../../../../utils/types";
import { Database } from "../../../../utils/postgresql";
import { GetAllClaimsResponse } from "../models/dto/response/get-all-claims.response";
import { GetAllClaimsRequest } from "../models/dto/request/get-all-claims.request";
import { ClaimModel } from "../models/entities/claim.model";

@injectable()
export default class ClaimsRepository {

	constructor(@inject(TYPES.PgClient) private databaseClient: Database) {}

	async getAllClaims(request: GetAllClaimsRequest): Promise<GetAllClaimsResponse[]> {
		const query = `select 	claim_id, cp.company_name, cr.claim_reason_name, claim_description, customer_email, c.created_date,
								c.update_date, c.status, c.advisor_comment, c.advisor_email 
						from t_claim c
						left join t_company cp on c.company_id = cp.company_id
						left join t_claim_reason cr on c.claim_reason_id = cr.claim_reason_id
						where (claim_id = $1 or $1 is null)`;
		try {
			const params = [request.claimId];
			const result = await this.databaseClient.query(query, params);
			return result.rows as unknown as GetAllClaimsResponse[];
		} catch (error: unknown) {
			console.log(error);
			throw error;
		}
	}

	async createClaim(model: ClaimModel): Promise<number> {
		const query = `insert into t_claim (company_id, claim_reason_id, claim_description, customer_email, created_date, status) values ($1, $2, $3, $4, $5, $6) 
						returning claim_id;`;
		try {
			const params = [model.companyId, model.claimReasonId, model.claimDescription, model.customerEmail, model.createdDate, model.status];
			const result = await this.databaseClient.query(query, params);
			return result.rows[0].claim_id;

		} catch (error: unknown) {
			console.log(error);
			throw error;
		}
	}

	async updateClaim(model: ClaimModel): Promise<number> {
		const query = `update t_claim set status = $1, advisor_comment = $2, advisor_email = $3, update_date = $4 where claim_id = $5;`;
		try {
			const params = [model.status, model.advisorComment, model.advisorEmail, model.updateDate, model.claimId];
			const result = await this.databaseClient.query(query, params);
			return result?.rowCount ?? 0;
		} catch (error: unknown) {
			console.log(error);
			throw error;
		}
	}
}
