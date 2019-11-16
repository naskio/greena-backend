import mongoose from "mongoose";
import * as dotEnv from 'dotenv';

dotEnv.config();

const {MONGODB_URI} = process.env;

/**
 * connecting to mongo db
 */

mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
)
    .then(() => console.log('Connected Successfully to mongodb'))
    .catch(() => console.log("Can't connect to mongodb"));


// const config = new Config();
// console.log('save1 CONFIG');
// config.save()
//     .then(config => {
//         console.log('Success');
//         console.log(config);
//     })
//     .catch(e => {
//         console.log('Error');
//         console.log(e);
//     });


// console.log('findById CONFIG');
// Config.findById(CONFIG)
//     .then(config => {
//         console.log('Success');
//         console.log(config);
//     })
//     .catch(e => {
//         console.log('Error');
//         console.log(e);
//     });

// const config = new Config();
// console.log('save1 CONFIG');
// config.save()
//     .then(config => {
//         console.log('Success');
//         console.log(config);
//     })
//     .catch(e => {
//         console.log('Error');
//         console.log(e);
//     });

// console.log('findByIdAndUpdate CONFIG');
// Config.findByIdAndUpdate(CONFIG, {aboutApp: 'mini e-commerce'}, {
//     new: true,
//     useFindAndModify: false,
// })
//     .then(config => {
//         console.log('Success');
//         console.log(config);
//     })
//     .catch(err => {
//         console.error(err);
//     });

// console.log('findById CONFIG');
// Config.findById(CONFIG, {lean: true})
//     .then(config => {
//         console.log(config);
//     }).catch(err => {
//         console.error(err);
//     }
// );
