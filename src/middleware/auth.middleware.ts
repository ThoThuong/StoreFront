import { NextFunction, Request, Response } from 'express';

import JWT from '../helper/jwt.helpers';


class Authentication {
  private jwt!: JWT;

  constructor() {
    this.jwt = new JWT();
  }

  auth = async (req: Request, res: Response, next: NextFunction): Promise<void | boolean> => {

    if (!req.headers.authorization) {
      res.status(401).json({
        response: 'Error',
        error: {
          type: 'Unauthorized',
          path: req.path,
          statusCode: 401,
          message: 'Access denied, missing access token'
        }
      });

      return false;
    }

    try {
      const [scheme, access_token] = req.headers.authorization.split(' ');
      if (!scheme || !access_token || scheme !== 'Bearer') {
        res.status(401).json({
          response: 'Error',
          error: {
            type: 'Unauthorized',
            path: req.path,
            statusCode: 401,
            message: 'Access denied, invalid access token'
          }
        });

        return false;
      }
      const resultVerify: any = await this.jwt.verifyToken(access_token);
      const [key, value] = Object.entries(resultVerify)
      const isInvalid = key.includes('NotBeforeError') || key.includes('JsonWebTokenError') || key.includes('TokenExpiredError');
      if (isInvalid) {
        res.status(401).json({
          response: 'Error',
          error: {
            type: 'Unauthorized',
            path: req.path,
            statusCode: 401,
            message: `${resultVerify.name}: ${resultVerify.message}`
          }
        });
        return false
      }
      next();
    } catch (err: unknown) {
      res.status(401).json({
        response: 'Error',
        error: {
          type: 'Unauthorized',
          path: req.path,
          statusCode: 401,
          message: 'Access denied, invalid token'
        }
      });

      return false;
    }
  }
}
export default Authentication; 