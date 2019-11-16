import mongoose, {Schema} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import {phoneRegex, emailRegex} from "../utils/regex";
import {ADMIN, USER} from "../authentification";

const UserSchema = new Schema({
        // id
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            // unique: true,
            validate: {
                validator: async (v) => (v && phoneRegex.test(v)),
                message: props => `{${props.value}} is not a valid {${props.path}}.`,
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: async (v) => (v && emailRegex.test(v)),
                message: props => `{${props.value}} is not a valid {${props.path}}.`,
            }
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: [ADMIN, USER],
            default: USER,
        },
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }
);

UserSchema.index({
    // phone: 1,
    email: 1,
});

UserSchema.plugin(
    uniqueValidator, {message: '{{VALUE}} already exists in {{PATH}}.'}
);


export default mongoose.model('User', UserSchema);
