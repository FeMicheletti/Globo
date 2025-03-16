import { Request, Response, NextFunction } from 'express';
import { badrequestReturn } from '../support/support';

export async function validationPostUser(req: Request, res: Response, next: NextFunction):Promise<void> {
    const body = req.body;

    if (typeof body.name === 'string' && typeof body.email === 'string' && typeof body.password === 'string' && typeof body.role === 'string') {
        next();
    } else {
        return badrequestReturn(res);
    }
};
