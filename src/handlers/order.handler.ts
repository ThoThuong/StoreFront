import { Request, Response } from 'express';

import { Order, OrderSchemal } from '../models/order.model';


class OrderHandler {
    private _OrderSchemal!: OrderSchemal;

    constructor() {
        this._OrderSchemal = new OrderSchemal();
    }

    index = async (req: Request, res: Response) => {
        try {
            const orders: Order[] = await this._OrderSchemal.index()

            return res.status(200).json({
                'response': 'Successfull',
                'message': 'Successfully get all.',
                'data': orders
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
    }

    create = async (req: Request, res: Response) => {
        try {
            const { status, userId, products } = req.body;

            if (!products || !status || !userId) {
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

            const order: Order = await this._OrderSchemal.create({ products, status, userId })

            if (!order) {
                return res.status(500).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 500,
                        message: 'An error occur while create the order.'
                    }
                });
            }

            return res.status(201).json({
                'response': 'successfull',
                'message': 'Successfully created.',
                'data': {
                    order
                }
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
    }

    read = async (req: Request, res: Response) => {
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

            const order: Order = await this._OrderSchemal.read(id);

            if (!order) {
                return res.status(404).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 404,
                        message: 'Can not find the order.'

                    }
                });
            }

            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully get one.',
                'data': order
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
    }

    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            let { products, status, userId } = req.body;

            if (!products || !status || !userId || !id) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Invalid request body to update the order'
                    }
                });
            }

            const order: Order = await this._OrderSchemal.update(id, { products, status, userId })
            if (!order) {
                return res.status(500).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 500,
                        message: 'An error occur while update the .'
                    }
                });
            }


            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully updated',
                'data': order
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
    }

    delete = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Can not find the order to delete.'
                    }
                });
            }

            await this._OrderSchemal.delete(id);

            return res.status(204).json({
                'response': 'Successfull',
                'message': 'Successfully delete the order.',
                'data': null
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
    }
}


export default OrderHandler;