export interface IVotes {
    id: number;
    user_id: number;
    movie_id: number;
    vote: number;
    created_at: Date;
    expires_at: Date;
}