import { Request, Response } from 'express';
import JWT from '../helper/jwt.helpers';
import { Product, ProductSchemal } from '../models/product.model';

class ProductHandler {
    private _ProductSchemal!: ProductSchemal;

    constructor() {
        this._ProductSchemal = new ProductSchemal();
    }

    index = async (req: Request, res: Response) => {
        try {
            const products: Product[] = await this._ProductSchemal.index();

            return res.status(200).json({
                'response': 'Successfull',
                'message': 'Successfully get all.',
                'data': products
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
            const { name, price } = req.body;

            if (!name || !price) {
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

            const product: Product = await this._ProductSchemal.create({ name, price })
            if (!product) {
                return res.status(500).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 500,
                        message: 'An error occur while create the product.'
                    }
                });
            }

            return res.status(201).json({
                'response': 'successfull',
                'message': 'Successfully created.',
                'data': {
                    product
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

            const product: Product = await this._ProductSchemal.read(id)

            if (!product) {
                return res.status(404).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 404,
                        message: 'Can not find the product.'

                    }
                });
            }

            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully get one.',
                'data': product
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
    }

    update = async (req: Request, res: Response) => {
        try {
            const { name, price } = req.body;
            const { id } = req.params;

            if ((!name && !price) || !id) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Please enter name or price and provide exactly id to update.'
                    }
                });
            }

            const product: Product = await this._ProductSchemal.update(id, { name, price });
            if (!product) {
                return res.status(500).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 500,
                        message: 'An error occur while update the product.'
                    }
                });
            }

            return res.status(200).json({
                'response': 'successfull',
                'message': 'Successfully updated',
                'data': product
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

    deleteProduct = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;

            if (!id) {
                return res.status(400).json({
                    response: 'Error',
                    error: {
                        type: 'Bad Request',
                        path: req.originalUrl,
                        statusCode: 400,
                        message: 'Can not find the product to delete.'
                    }
                });
            }

            await this._ProductSchemal.deleteProduct(id);

            return res.status(204).json({
                'response': 'Successfull',
                'message': 'Successfully delete the product.',
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
    }
}

export default ProductHandler;