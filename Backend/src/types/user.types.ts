export interface IUser {
    id: number;
    nome: string;
    email: string;
    password: string;
    role: string;
    is_active: number;
    created_at: Date;
    updated_at: Date;
}
