import { inject, injectable } from "inversify";
import TYPES from "../../../../utils/types";
import ClaimsRepository from "../repositories/claims.repository";
import { GetAllClaimsResponse } from "../models/dto/response/get-all-claims.response";
import { ClaimModel } from "../models/entities/claim.model";
import { CreateClaimRequest } from "../models/dto/request/create-claim.request";
import { UpdateClaimRequest } from "../models/dto/request/update-claim.request";

@injectable()
export class ClaimsService {
	constructor(
		@inject(TYPES.ClaimsRepository)
		private readonly repository: ClaimsRepository,
	) {}

	// se devuelve un arreglo de registros dependendiendo de los filtros
    async getAllClaims(claimsId?: string): Promise<GetAllClaimsResponse[]> {
		return this.repository.getAllClaims({  claimId: claimsId === undefined ? undefined : parseInt(claimsId) });
    }

	// se devuelve el id del registro creado
	async createClaim(request: CreateClaimRequest): Promise<number> {
		console.log(request);
		const model: ClaimModel = {
			claimDescription: request.claim_description,
			claimReasonId: request.claim_reason_id,
			companyId: request.company_id,
			createdDate: new Date(),
			customerEmail: request.customer_email,
			status: "PEN"
		};
		return this.repository.createClaim(model);
	}

	// se devuelve la cantidad de registros afectados 
	async updateClaim(request: UpdateClaimRequest): Promise<number> {
		const model: ClaimModel = {
			claimId: request.claim_id,
			advisorComment: request.advisor_comment,
			advisorEmail: request.advisor_email,
			updateDate: new Date(),
			status: request.status,
		};
		return this.repository.updateClaim(model);
	}
	

}