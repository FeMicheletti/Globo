import { Response } from 'express';

export function unauthorizedReturn(res: Response):void {
    res.status(401).json({ error: 'Operação não autorizada' });
}

export function badrequestReturn(res: Response):void {
    res.status(400).json({ error: 'Solicitação inválida. Favor verificar os parâmetros.' });
}

export function getTodayToDB():string {
    const todayInDB = new Date().toISOString().slice(0, 19).replace('T', ' ');
    return todayInDB;
}