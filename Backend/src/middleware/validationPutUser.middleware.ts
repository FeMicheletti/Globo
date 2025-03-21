import { Request, Response, NextFunction } from 'express';
import { badrequestReturn } from '../support/support';

export async function validationPutUser(req: Request, res: Response, next: NextFunction):Promise<void> {
    const body = req.body;

    if (typeof body.name === 'string' && typeof body.email === 'string' && typeof body.role === 'string' && typeof body.active === 'boolean') {
        next();
    } else {
        return badrequestReturn(res);
    }
};
