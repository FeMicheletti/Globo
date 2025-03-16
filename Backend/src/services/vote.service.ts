import { Database } from '../_class/database';
import { getTodayToDB } from '../support/support';
import { IVotes } from '../types/vote.types';

export class VoteService {
    static async getVotes(filter:string = '', params:Array<string | number> = []): Promise<IVotes[]> {
        const database = new Database;

        if (filter != '') filter = "WHERE "+filter;

        var cSql =  "SELECT "
                        +"`id`, "
                        +"`user_id`, "
                        +"`movie_id`, "
                        +"`vote`, "
                        +"`created_at`, "
                        +"`updated_at` "
                    +"FROM "
                        +"`votes` "
                    +filter+";";
        const results = await database.select(cSql, params);

        return results;
    }

    static async removeUserVotes(user_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM votes WHERE user_id = ?;";
        await database.delete(cSql, [user_id]);

        return;
    }

    static async removeMovieVotes(movie_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM votes WHERE movie_id = ?;";
        await database.delete(cSql, [movie_id]);

        return;
    }

    static async insertVote(user_id:number, movie_id:number, vote:number): Promise<IVotes[]> {
        const database = new Database;

        var cSql = "INSERT INTO `votes` (`user_id`, `movie_id`, `vote`) VALUES (?, ?, ?);"

        await database.insert(cSql, [user_id, movie_id, vote]);

        return await this.getVotes("user_id = ? AND movie_id = ?", [ user_id, movie_id ]);
    }

    static async updateVote(vote_id:number, vote:number): Promise<IVotes[]> {
        const database = new Database;

        var cSql = "UPDATE `votes` SET `vote` = ?, updated_at = ? WHERE `id` = ?;"

        await database.update(cSql, [vote, getTodayToDB(), vote_id]);

        return await this.getVotes("id", [ vote_id ]);
    }
}