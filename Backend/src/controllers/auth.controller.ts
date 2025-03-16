import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { badrequestReturn } from '../support/support';

export class AuthController {
    static async loginUser(req: Request, res: Response): Promise<void> {
        var token = "";

        const { email, password } = req.body;

        //* Recupera informações do usuário
        const userInfo = await UserService.getUser(true, "email = ?", [email]);

        //* Valida login
        const loginValidado = await AuthService.validaLogin(userInfo, password);

        if (loginValidado) {
            //* Verifica se o usuário já não tem um token valido
            const tokenSalvo = await AuthService.getTokenByUser(userInfo[0].id);
            const tokenValidado = await AuthService.validaToken(tokenSalvo);

            if (tokenValidado) {
                token = tokenSalvo[0].token;
            } else {
                token = await AuthService.generateToken(userInfo[0]);
            }

            if (token != "") {
                res.status(200).json({token: token});
                return;
            }
        }

        return badrequestReturn(res);
    }

    static async logoutUser(req: Request, res: Response): Promise<void> {
        const { user_id } = req.body;
        await AuthService.logoutUser(user_id);
        res.status(204).json();
    }
}