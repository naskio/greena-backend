import mongoose, {Schema} from 'mongoose';


const ProductSchema = new Schema({
        // id
        title: {
            type: String,
            required: true,
        },
        subCategory: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price should be positive'],
        },
        nutritionScore: {
            type: String,
            required: true,
            enum: ['A', 'B', 'C', 'D', 'E'],
            default: 'C',
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        },
        strict: false,
    }
);

export default mongoose.model('Product', ProductSchema);
