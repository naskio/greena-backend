import _ from 'lodash';
import Product from '../models/product.model';


/**
 * get All products
 * @param req
 * @param res
 * @param next
 */
export const getAllProducts = async (req, res, next) => {
    const products = await Product.find({}).lean();
    if (!products) {
        return res.status(204).json();
    } else {
        return res.status(200).json(products);
    }
};


/**
 * create a new product
 * @param req
 * @param res
 * @param next
 */
export const createProduct = async (req, res, next) => {
    const values = _.omit(req.body, ['_id']);
    const newInstance = new Product(values);
    let createdInstance = (await newInstance.save()).toObject();
    if (!createdInstance) {
        const error = new Error('Bad request');
        error.status = 400;
        return next(error);
    } else {
        return res.status(200).json(createdInstance);
    }
};


/**
 * update a product
 * @param req
 * @param res
 * @param next
 */
export const updateProduct = async (req, res, next) => {
    const {_id} = req.params;
    const updates = _.omit(req.body, ['_id']);
    const updatedInstance = await Product.findOneAndUpdate({
            _id: _id,
        },
        updates,
        {
            useFindAndModify: false,
            new: true,
            runValidators: true,
            context: 'query',
            strict: false,
        }).lean();
    if (!updatedInstance) {
        const error = new Error('Not found');
        error.status = 404;
        return next(error);
    } else {
        return res.status(200).json(updatedInstance);
    }
};


/**
 * delete a product
 * @param req
 * @param res
 * @param next
 */
export const deleteProduct = async (req, res, next) => {
    const {_id} = req.params;
    const deletedInstance = await Product.findOneAndRemove({
        _id: _id,
    }).lean();
    if (!deletedInstance) {
        const error = new Error('Not found');
        error.status = 404;
        return next(error);
    } else {
        return res.status(200).json(deletedInstance);
    }
};
