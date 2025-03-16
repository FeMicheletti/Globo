import { Request, Response, NextFunction } from 'express';
import { unauthorizedReturn } from '../support/support';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';

export function authenticateToken(req: Request, res: Response, next: NextFunction):void {
    const authHeader = req.headers.authorization;
    if (!authHeader) return unauthorizedReturn(res);

    const token = authHeader.split(' ')[1];
    if (!token) unauthorizedReturn(res);

    jwt.verify(token, process.env.JWT_SECRET as string, async(err, decoded) => {
        if (err) return unauthorizedReturn(res);

        decoded = decoded as object;
        const tokenInfo = await AuthService.getTokenByUser(decoded.userId);
        const validaToken = await AuthService.validaToken(tokenInfo);

        if (validaToken) {
            const userInfo = await UserService.getUser(false, "id = ?", [decoded.userId]);
            if (userInfo && userInfo[0].is_active) {
                req.tokenJWT = decoded;
                return next();
            }
        }

        return unauthorizedReturn(res);
    });
}