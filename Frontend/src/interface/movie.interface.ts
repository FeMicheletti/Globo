import { ReactElement } from "react";

export interface movieTable {
    id: number,
    title: string,
    director: string,
    genre: string,
    release: string,
    vote_average: ReactElement
}

export interface castInterface {
    id:Number, 
    actor_name: string; 
    role: string;
}