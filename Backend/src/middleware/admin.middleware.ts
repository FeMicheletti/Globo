import { Request, Response, NextFunction } from 'express';
import { unauthorizedReturn } from '../support/support';
import { UserService } from '../services/user.service';

export async function isAdmin(req: Request, res: Response, next: NextFunction):Promise<void> {
    const user = req.tokenJWT;

    const userInfo = await UserService.getUser(false, "id = ?", [user.userId]);

    if (user && userInfo[0].role === 'admin') {
        next();
    } else {
        return unauthorizedReturn(res);
    }
};
