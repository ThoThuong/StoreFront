import { Request, Response } from 'express';

import JWT from '../helper/jwt.helpers';
import { User, UserSchemal, UserOrders } from '../models/user.model';

class UserHandler {

    private _UserSchemal!: UserSchemal;
    private jwt!: JWT;

    constructor() {
        this._UserSchemal = new UserSchemal();
        this.jwt = new JWT();
    }

    index = async (req: Request, res: Response): Promise<any> => {
        try {
            const users: User[] = await this._UserSchemal.index();
            return res.status(200).json({
                'response': 'Successfull',
                'message': 'Successfully get all.',
                'data': users,
            });

        } catch (err: any) {
            return res.status(500).json({
                response: 'Error',
                error: {
                    type: err.constructor.name,
                    path: req.originalUrl,
                    statusCode: 500,
                    message: err.message
                }
            });
        }
    };

    create = async (req: Request, res: Response): Promise<any> => {

        try {
            const { firstname, lastname, username, password } = req.body;
            if (!firstname || !lastname || !username || !password) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Mandatory fields can not be empty or lacking.'
                    }
                });
            }
            const user: User = await this._UserSchemal.create({ firstname, lastname, username, password });
            const accessToken = this.jwt.generateToken(user);
            delete user.password;

            return res.status(201).json({
                'response': 'successfull',
                'message': 'Successfully created.',
                'data': {
                    user,
                    accessToken
                }
            });

        } catch (err: any) {
            console.log('abc', err)
            return res.status(500).json({
                response: 'Error',
                error: {
                    type: err.constructor.name,
                    path: req.originalUrl,
                    statusCode: 500,
                    message: err.message
                }
            });
        }

    };

    read = async (req: Request, res: Response): Promise<any> => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Invalid request.'
                    }
                });
            }

            const user: User = await this._UserSchemal.read(id);

            if (!user) {
                return res.status(404).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 404,
                        message: 'Can not find the user.'

                    }
                });
            }
            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully get one.',
                'data': user
            });

        } catch (err: any) {
            return res.status(500).json({
                response: 'Error',
                error: {
                    type: err.constructor.name,
                    path: req.originalUrl,
                    statusCode: 500,
                    message: err.message
                }
            });
        };
    };

    readUserOrders = async (req: Request, res: Response): Promise<any> => {
        try {
            const { userId } = req.params;

            if (!userId) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Invalid request.'
                    }
                });
            }

            const userOrders: UserOrders = await this._UserSchemal.userOrders(userId);

            if (!userOrders) {
                return res.status(404).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 404,
                        message: 'Can not find any order belonging to the user with id, {userId}.'

                    }
                });
            }
            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully get orders list belonging to the user.',
                'data': userOrders
            });

        } catch (err: any) {
            return res.status(500).json({
                response: 'Error',
                error: {
                    type: err.constructor.name,
                    path: req.originalUrl,
                    statusCode: 500,
                    message: err.message
                }
            });
        };
    };

    update = async (req: Request, res: Response): Promise<any> => {
        try {
            const { firstname, lastname } = req.body;
            const { id } = req.params;

            if ((!firstname && !lastname) || !id) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Please enter firstname or lastname and exactly id to update.'
                    }
                });
            }

            const user: User = await this._UserSchemal.update(id, { firstname, lastname });

            if (!user) {
                return res.status(500).json({
                    response: 'Error',
                    error: {
                        type: 'Error Internal Server',
                        path: req.originalUrl,
                        statusCode: 500,
                        message: 'An error occur while update the user.'
                    }
                });
            }

            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully updated',
                'data': user
            });

        } catch (err: any) {
            return res.status(500).json({
                response: 'Error',
                error: {
                    type: err.constructor.name,
                    path: req.originalUrl,
                    statusCode: 500,
                    message: err.message
                }
            });
        }
    };

    deleteUser = async (req: Request, res: Response): Promise<any> => {
        try {
            const id = req.params.id;
            if (!id) {

                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Can not find the user to delete.'
                    }
                });
            }

            const isDelSuccessfully = await this._UserSchemal.deleteUser(`${id}`);

            if (!isDelSuccessfully) {
                return res.status(500).json({
                    response: 'Error',
                    error: {
                        type: 'Error Internal Server',
                        path: req.originalUrl,
                        statusCode: 500,
                        message: 'An error occur while delete the user.'
                    }
                });
            }
            return res.status(204).json({
                'response': 'Successfull',
                'message': 'Successfully delete the user.',
                'data': null
            });;
        } catch (err: any) {
            return res.status(500).json({
                response: 'Error',
                error: {
                    type: err.constructor.name,
                    path: req.originalUrl,
                    statusCode: 500,
                    message: err.message
                }
            });
        }

    };
}

export default UserHandler;