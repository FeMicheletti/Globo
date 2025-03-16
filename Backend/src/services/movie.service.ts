import { Database } from '../_class/database';
import { ICast, IMovie } from '../types/movie.types';

export class MovieService {
    static async getMovie(filter:string = '', params:Array<string | number> = []): Promise<IMovie[]> {
        const database = new Database;

        if (filter != '') filter = "WHERE "+filter;

        var cSql =  "SELECT "
                        +"`id`, "
                        +"`created_by`, "
                        +"`title`, "
                        +"`director`, "
                        +"`genre`, "
                        +"`release`, "
                        +"`synopsis`, "
                        +"`created_at`, "
                        +"`updated_at` "
                    +"FROM "
                        +"`movies` "
                    +filter+";";
        const results = await database.select(cSql, params);

        return results;
    }

    static async getMovieCast(movie_id:number): Promise<ICast[]> {
        const database = new Database;

        var cSql =  "SELECT "
                        +"`id`, "
                        +"`movie_id`, "
                        +"`actor_name`, "
                        +"`role` "
                    +"FROM "
                        +"`movie_cast` "
                    +"WHERE "
                        +"`movie_id` = ?;";
        const results = await database.select(cSql, [ movie_id ]);

        return results;
    }

    static async insertMovie(user_id:number, title:string, director:string, genre:string, release:string, synopsis:string): Promise<IMovie[]> {
        const database = new Database;

        var cSql = "INSERT INTO `movies` (`created_by`, `title`, `director`, `genre`, `release`, `synopsis`) VALUES (?, ?, ?, ?, ?, ?);"

        await database.insert(cSql, [user_id, title, director, genre, release, synopsis ]);

        return await this.getMovie('title = ?', [ title ]);
    }

    static async insertCast(movie_id:number, cast:Array<any>): Promise<ICast[]> {
        const database = new Database;

        for await (const elCast of cast) {
            var cSql = "INSERT INTO `movie_cast` (`movie_id`, `actor_name`, `role`) VALUES (?, ?, ?);"
            await database.insert(cSql, [ movie_id, elCast.name, elCast.role ]);
        }

        return await this.getMovieCast(movie_id);
    }

    static async updateMovie(movie_id:number, title:string, director:string, genre:string, release:string, synopsis:string): Promise<IMovie[]> {
        const database = new Database;

        var cSql = "UPDATE `movies` SET `title` = ?, `director` = ?, `genre` = ?, `release` = ?, `synopsis` = ? WHERE id = ?;"

        await database.insert(cSql, [title, director, genre, release, synopsis, movie_id ]);

        return await this.getMovie('id = ?', [ movie_id ]);
    }

    static async updateCast(movie_id:number, cast:Array<any>): Promise<ICast[]> {
        //* Deletar os que foram removidos e inserir os novos
        var toInsert = [];
        var toDelete = [];

        const castInfo = await this.getMovieCast(movie_id);
        for (const castToCheck of cast) {
            const hasInDb = castInfo.some((elCast) => (elCast.actor_name === castToCheck.name && elCast.role === castToCheck.role));
            if (!hasInDb) {
                await this.insertCast(movie_id, [castToCheck]);
            }
        }

        for (const elCast of castInfo) {
            const hasInFront = cast.some((castToCheck) => (castToCheck.name === elCast.actor_name && castToCheck.role === elCast.role));
            if (!hasInFront) {
                await this.deleteCast(movie_id, elCast.id)
            }
        }

        return await this.getMovieCast(movie_id);
    }

    static async removeMovie(movie_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM movies WHERE id = ?;";
        await database.delete(cSql, [movie_id]);

        return;
    }

    static async removeAllMovieCast(movie_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM movie_cast WHERE movie_id = ?;";
        await database.delete(cSql, [movie_id]);

        return;
    }

    static async deleteCast(movie_id:number, cast_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM movie_cast WHERE movie_id = ? AND id = ?;";
        await database.delete(cSql, [ movie_id, cast_id ]);

        return;
    }
}