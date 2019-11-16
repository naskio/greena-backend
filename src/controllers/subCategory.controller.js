import _ from 'lodash';
import SubCategory from '../models/subCategory.model';

/**
 * get All categories
 * @param req
 * @param res
 * @param next
 */
export const getAllSubCategories = async (req, res, next) => {
    const subCategories = await SubCategory.find({})
        .populate({
            path: 'category',
            model: 'Category',
            select: {_id: 1, title: 1,},
        })
        .lean();
    if (!subCategories) {
        return res.status(204).json();
    } else {
        return res.status(200).json(subCategories);
    }
};


/**
 * create a new subCategory
 * @param req
 * @param res
 * @param next
 */
export const createSubCategory = async (req, res, next) => {
    const values = _.omit(req.body, ['_id']);
    const newInstance = new SubCategory(values);
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
 * delete a subCategory
 * @param req
 * @param res
 * @param next
 */
export const deleteSubCategory = async (req, res, next) => {
    const {_id} = req.params;
    const deletedInstance = await SubCategory.findOneAndRemove({
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
 * update a subCategory
 * @param req
 * @param res
 * @param next
 */
export const updateSubCategory = async (req, res, next) => {
    const {_id} = req.params;
    const updates = _.omit(req.body, ['_id']);
    const updatedInstance = await SubCategory.findOneAndUpdate(
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
