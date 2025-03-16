import { Request, Response, NextFunction } from 'express';
import { badrequestReturn } from '../support/support';

export async function validationPostMovie(req: Request, res: Response, next: NextFunction):Promise<void> {
    const body = req.body;

    if (typeof body.title === 'string' && typeof body.director === 'string' && typeof body.genre === 'string' && typeof body.synopsis === 'string' && typeof body.release === 'number' && typeof body.cast === 'object') {
        next();
    } else {
        return badrequestReturn(res);
    }
};
