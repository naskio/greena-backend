import mongoose, {Schema} from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

const CategorySchema = new Schema({
        // id
        title: {
            type: String,
            required: true,
            unique: true,
        },
    }
);

CategorySchema.index({
    title: 1,
});

CategorySchema.plugin(
    uniqueValidator, {message: '{{VALUE}} already exists in {{PATH}}.'}
);

CategorySchema.virtual('subCategories', {
    ref: 'SubCategory',
    localField: '_id',
    foreignField: 'category',
    justOne: false // set true for one-to-one relationship
});

export default mongoose.model('Category', CategorySchema);
