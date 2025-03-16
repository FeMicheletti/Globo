import { Database } from '../_class/database';
import { IUser } from '../types/user.types';
import { IToken } from '../types/auth.types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
    static async validaLogin(userInfo: IUser[], password: string): Promise<boolean> {
        if (userInfo.length != 1 || !userInfo[0].is_active) return false;
        if (!bcrypt.compareSync(password, userInfo[0].password)) return false;
        return true;
    }

    static async getTokenByUser(userId:number): Promise<IToken[]> {
        const database = new Database;

        var cSql =  "SELECT "
                        +"`token`, "
                        +"`expires_at` "
                    +"FROM "
                        +"`tokens` "
                    +"WHERE "
                        +"`user_id` = ?;";
        const results = await database.select(cSql, [userId]);

        return results;
    }

    static async validaToken(tokenInfo:IToken[]): Promise<boolean> {
        if (tokenInfo.length == 1 && new Date() < new Date(tokenInfo[0].expires_at)) return true;
        return false;
    }

    static async generateToken(authInfo:IUser): Promise<string> {
        const tokenInfo = {
            userId: authInfo.id
        };

        const token = jwt.sign(tokenInfo, process.env.JWT_SECRET || '');

        const today = new Date();
        const expiresAtTimestamp = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const expiresAt = expiresAtTimestamp.toISOString().slice(0, 19).replace('T', ' ');

        const database = new Database;

        var cSql = "INSERT INTO tokens (`user_id`, `token`, `expires_at`) values (?, ?, ?);";
        await database.insert(cSql, [authInfo.id, token, expiresAt]);

        return token;
    }

    static async logoutUser(user_id:number): Promise<void> {
        const database = new Database;

        var cSql = "DELETE FROM tokens WHERE user_id = ?;";
        await database.delete(cSql, [user_id]);

        return;
    }
}
