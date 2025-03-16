export interface IMovie {
    id: number;
    created_by: number;
    title: string;
    director: string;
    genre: string;
    release: number;
    synopsis: string;
    cast: object;
    created_at: Date;
    updated_at: Date;
}

export interface ICast {
    id: number,
    movie_id: number,
    actor_name: string,
    role: string
}