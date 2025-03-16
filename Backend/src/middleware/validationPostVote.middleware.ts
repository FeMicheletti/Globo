import { Request, Response, NextFunction } from 'express';
import { badrequestReturn } from '../support/support';

export async function validationPostVote(req: Request, res: Response, next: NextFunction):Promise<void> {
    const body = req.body;

    if (typeof body.vote === 'number') {
        next();
    } else {
        return badrequestReturn(res);
    }
};
