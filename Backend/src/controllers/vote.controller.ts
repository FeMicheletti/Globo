import { Request, Response } from 'express';
import { VoteService } from '../services/vote.service';

export class VoteController {
    static async makeVote(req: Request, res: Response): Promise<void> {
        const user_id = req.tokenJWT.userId;
        const movie_id = Number(req.params.id);
        const { vote } = req.body;

        const voteInfo = await VoteService.getVotes("user_id = ? AND movie_id = ?", [ user_id, movie_id ]);

        if (voteInfo.length == 0) {
            //* Cria o novo voto do usuário
            var result = await VoteService.insertVote(user_id, movie_id, vote);
            res.status(201).json(result);
        } else {
            //* Atualiza o voto do usuário
            var result = await VoteService.updateVote(voteInfo[0].id, vote);
            res.status(200).json(result);
        }
    }
}