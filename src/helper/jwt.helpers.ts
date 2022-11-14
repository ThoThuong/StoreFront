import dotenv from 'dotenv';
import jwt, { Secret } from 'jsonwebtoken';

import { User } from '../models/user.model';

dotenv.config();

class JWT {
    private SECRET = process.env.TOKEN_SECRET as Secret
    private TOKEN_LIFE = '7d'

    generateToken = (user: User, secretSignature: Secret = this.SECRET, tokenLife: string = this.TOKEN_LIFE): string | unknown => {
        try {
            const jwtToken = jwt.sign(
                { data: user },
                secretSignature,
                {
                    algorithm: "HS256",
                    expiresIn: tokenLife,
                },
            );
            return `${jwtToken}`;
        } catch (err: any) {
            return err;
        }
    }

    verifyToken = async (token: string, secretKey: Secret = this.SECRET): Promise<boolean | unknown> => {
        try {
            return await jwt.verify(token, secretKey);
        } catch (err: any) {
            return err;
        }
    }
}

export default JWT;