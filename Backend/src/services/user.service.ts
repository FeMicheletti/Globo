import { Database } from '../_class/database';
import { getTodayToDB } from '../support/support';
import { IUser } from '../types/user.types';

export class UserService {
    static async getUser(showPassword:boolean, filter:string = '', params:Array<string | number> = []): Promise<IUser[]> {
        const database = new Database;

        if (filter != '') filter = "WHERE "+filter;

        var cSql =  "SELECT "
                        +"`id`, "
                        +"`nome`, "
                        +"`email`, "
                        +(showPassword ? "`password`, " : " ")
                        +"`role`, "
                        +"`is_active`, "
                        +"`created_at`, "
                        +"`updated_at` "
                    +"FROM "
                        +"`users` "
                    +filter+";";
        const results = await database.select(cSql, params);

        return results;
    }

    static async insertUser(name:string, email:string, password:string, role:string, active:boolean = true): Promise<IUser[]> {
        const database = new Database;

        var cSql = "INSERT INTO `users` (`nome`, `email`, `password`, `role`, `is_active`) VALUES (?, ?, ?, ?, ?);"

        await database.insert(cSql, [name, email, password, role, active]);

        return await this.getUser(false, 'nome = ? AND email = ?', [name, email]);
    }

    static async updateUser(user_id:number, name:string, email:string, password:string, role:string, active:boolean): Promise<IUser[]> {
        const database = new Database;

        var args =  [name, email, role, active,  getTodayToDB()];

        var cSqlPassword = "";
        if (password != "") {
            cSqlPassword = ", `password` = ?";
            args.push(password);
        }

        args.push(user_id.toString());

        var cSql = "UPDATE `users` SET `nome` = ?, `email` = ? "+cSqlPassword+", `role` = ?, `is_active` = ?, updated_at = ? WHERE `id` = ?;"

        await database.update(cSql, args);

        return await this.getUser(false, 'id = ?', [ user_id ]);
    }

    static async deleteUser(user_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM users WHERE id = ?;";
        await database.delete(cSql, [user_id]);

        return;
    }
}
