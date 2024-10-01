import { z } from 'zod';

const statusClaim = z.enum(['PEN', 'REV', 'CER', 'ANU'], { required_error: 'Se requiere un estado de reclamación' });

export const updateClaimSchema = z.object({
	claim_id: z.number({ required_error: 'Se requiere un id del reclamo'}),
    status: statusClaim,
    advisor_comment: z.string({ required_error: 'Se requiere un comentario del asesor'}),
    advisor_email: z.string({ required_error: 'Se requiere un correo electrónico del asesor'}).email({ message: 'El correo electrónico no es válido' }),
});

export type UpdateClaimRequest = z.infer<typeof updateClaimSchema>;