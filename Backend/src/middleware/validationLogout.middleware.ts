import { Request, Response, NextFunction } from 'express';
import { badrequestReturn } from '../support/support';

export async function validationLogout(req: Request, res: Response, next: NextFunction):Promise<void> {
    const body = req.body;

    if (typeof body.user_id === 'number') {
        next();
    } else {
        return badrequestReturn(res);
    }
};
