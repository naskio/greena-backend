import _ from 'lodash';
import Category from '../models/category.model';
import Product from "../models/product.model";

/**
 * get All categories
 * @param req
 * @param res
 * @param next
 */
export const getAllCategories = async (req, res, next) => {
    const categories = await Category.find({})
        .populate('subCategories')
        .lean();
    if (!categories) {
        return res.status(204).json();
    } else {
        return res.status(200).json(categories);
    }
};


/**
 * create a new category
 * @param req
 * @param res
 * @param next
 */
export const createCategory = async (req, res, next) => {
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
 * delete a category
 * @param req
 * @param res
 * @param next
 */
export const deleteCategory = async (req, res, next) => {
    const {_id} = req.params;
    const deletedInstance = await Product.findOneAndRemove({
        _id: _id,
    })
        .lean();
    if (!deletedInstance) {
        const error = new Error('Not found');
        error.status = 404;
        return next(error);
    } else {
        return res.status(200).json(deletedInstance);
    }
};


/**
 * update a category
 * @param req
 * @param res
 * @param next
 */
export const updateCategory = async (req, res, next) => {
    const {_id} = req.params;
    const updates = _.omit(req.body, ['_id']);
    const updatedInstance = await Product.findOneAndUpdate(
        {
            _id: _id,
        },
        updates,
        {
            useFindAndModify: false,
            new: true,
            runValidators: true,
            context: 'query',
        }).lean();
    if (!updatedInstance) {
        const error = new Error('Not found');
        error.status = 404;
        return next(error);
    } else {
        return res.status(200).json(updatedInstance);
    }
};
