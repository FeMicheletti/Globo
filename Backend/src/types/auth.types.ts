export interface IToken {
    id: number;
    user_id: number;
    token: string;
    created_at: Date;
    expires_at: Date;
}