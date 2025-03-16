import { Request, Response, NextFunction } from 'express';
import { badrequestReturn } from '../support/support';

export async function validationLogin(req: Request, res: Response, next: NextFunction):Promise<void> {
    const body = req.body;

    if (typeof body.email === 'string' && typeof body.password === 'string') {
        next();
    } else {
        return badrequestReturn(res);
    }
};
