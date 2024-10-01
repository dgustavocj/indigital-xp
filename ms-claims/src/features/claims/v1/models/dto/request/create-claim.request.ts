import { z } from 'zod';

export const createClaimSchema = z.object({
	company_id: z.number({ required_error: 'Se requiere un id de compañía'}),
    claim_reason_id: z.number({ required_error: 'Se requiere un motivo de reclamación'}),
    claim_description: z.string({required_error: 'Se requiere una descripción de la reclamación'}),
    customer_email: z.string({ required_error: 'Se requiere un correo electrónico del cliente'}).email({ message: 'El correo electrónico no es válido' }),
});

export type CreateClaimRequest = z.infer<typeof createClaimSchema>;