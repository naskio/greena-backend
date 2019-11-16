import mongoose, {Schema} from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

const SubCategorySchema = new Schema({
        // id
        title: {
            type: String,
            required: true,
            unique: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
    }
);

SubCategorySchema.index({
    title: 1,
});

SubCategorySchema.plugin(
    uniqueValidator, {message: '{{VALUE}} already exists in {{PATH}}.'}
);

export default mongoose.model('SubCategory', SubCategorySchema);
