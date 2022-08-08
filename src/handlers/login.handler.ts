import { Request, Response } from 'express';

import JWT from '../helper/jwt.helpers';
import { User, UserSchemal } from '../models/user.model';


class Login {
    private _UserSchemal!: UserSchemal;
    private jwt!: JWT;

    constructor() {
        this._UserSchemal = new UserSchemal();
        this.jwt = new JWT();
    }

    authen = async (req: Request, res: Response) => {
        try {
            const username = req.body.username as unknown as string;
            const password = req.body.password as unknown as string;

            if (!username || !password) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad request',
                        path: req.path,
                        statusCode: 400,
                        message: "Password or username is required."
                    }
                });
            }

            const user: User | null = await this._UserSchemal.authenticate(username, password);

            if (!user) {
                return res.status(401).json({
                    response: 'Error',
                    error: {
                        type: 'Unauthorized',
                        path: req.path,
                        statusCode: 401,
                        message: "Wrong credentials, please verify it again."
                    }
                });
            }

            const accessToken = this.jwt.generateToken(user);

            return res.status(200).json({
                'response': 'Authorized',
                'message': 'Successfully get all.',
                'data': {
                    accessToken
                }
            });
        } catch (err: any) {
            return res.status(401).json({
                response: 'Error',
                error: {
                    type: 'Unauthorized',
                    path: req.path,
                    statusCode: 401,
                    message: err.message
                }
            });
        }
    }
}

export default Login;