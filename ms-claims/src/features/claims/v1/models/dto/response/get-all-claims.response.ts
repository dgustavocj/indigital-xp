export interface GetAllClaimsResponse {
    claim_id: number;
    company_name: string;
    claim_reason_name: string;
    claim_description: string;
    customer_email: string;
    created_date: Date;

    update_date: Date;
    status: number; 
    advisor_comment: string; 
    advisor_email: string;
}