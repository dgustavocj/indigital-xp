import { z } from 'zod';

export const getAllClaimsSchema = z.object({
	claimId: z.number().optional(),
});

export type GetAllClaimsRequest = z.infer<typeof getAllClaimsSchema>;
