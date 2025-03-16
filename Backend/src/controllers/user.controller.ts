import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { VoteService } from '../services/vote.service';
import bcrypt from 'bcrypt';

export class UserController {
    static async getAllUsers(req: Request, res: Response): Promise<void> {
        const usersInfo = await UserService.getUser(false);
        res.json(usersInfo);
    }

    static async createUser(req: Request, res: Response): Promise<void> {
        const { name, email, password, role } = req.body;

        //* Verifica se já não existe um usuário com esse email
        var userInfo = await UserService.getUser(false, 'email = ?', [ email ]);

        if (userInfo.length != 0) {
            res.status(409).json(userInfo[0]);
            return;
        }

        var cryptoPassword = bcrypt.hashSync(password, 10);

        userInfo = await UserService.insertUser(name, email, cryptoPassword, role);

        res.status(201).json(userInfo[0]);
    }

    static async getUser(req: Request, res: Response): Promise<void> {
        const user_id = req.params.id;

        const userInfo = await UserService.getUser(false, 'id = ?', [ user_id ]);

        res.json(userInfo[0]);
    }

    static async updateUser(req: Request, res: Response): Promise<void> {
        const user_id = Number(req.params.id);
        const { name, email, password, role, active } = req.body;

        var userInfo = await UserService.getUser(false, 'email = ?', [ email ]);

        if (userInfo.length != 0) {
            res.status(409).json(userInfo[0]);
            return;
        }

        var cryptoPassword = bcrypt.hashSync(password, 10);

        userInfo = await UserService.updateUser(user_id, name, email, cryptoPassword, role, active);

        res.status(201).json(userInfo[0]);
    }

    static async deleteUser(req: Request, res: Response): Promise<void> {
        const user_id = Number(req.params.id);

        await AuthService.logoutUser(user_id);
        await VoteService.removeUserVotes(user_id);
        await UserService.deleteUser(user_id);

        res.status(204).json();
    }
}
