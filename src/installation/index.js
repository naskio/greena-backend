import mongoose from "mongoose";
import * as dotEnv from 'dotenv';
import chalk from 'chalk';
// import debug from 'debug';
import User from '../models/user.model';
import {hash} from "../utils/auth";
import _ from "lodash";
import {ADMIN} from "../authentification";

dotEnv.config();

const {
    MONGODB_URI,
    ADMIN_FIRST_NAME,
    ADMIN_LAST_NAME,
    ADMIN_EMAIL,
    ADMIN_PHONE,
    ADMIN_PASSWORD,
} = process.env;

// const logger = debug('installation');
const logger = console.log;


/**
 * launch this script to initialize the database
 * once the App deployed (only the first time)
 * create Config, User
 */
const main = async () => {
    logger(`Start of the installation script`);
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
            .then(() => {
                logger(`${chalk.green("Connected Successfully to mongodb")}`);
            })
            .catch(() => {
                logger(`${chalk.red("Can't connect to mongodb")}`);
            });


        /**
         * create Super Admin
         */
        await User.findOne({role: ADMIN}).select({
            password: false,
        })
            .lean()
            .then((user) => {
                if (!user) {
                    return hash(ADMIN_PASSWORD)
                        .then(hashedPassword => {
                            const newUser = new User({
                                firstName: ADMIN_FIRST_NAME,
                                lastName: ADMIN_LAST_NAME,
                                phone: ADMIN_PHONE,
                                password: hashedPassword,
                                email: ADMIN_EMAIL,
                                role: ADMIN,
                            });
                            return newUser.save()
                                .then(param => {
                                    let user = param.toObject();
                                    user = _.omit(user,
                                        [
                                            'password',
                                        ]);
                                    logger(chalk.green(`Admin "${user.firstName} ${user.lastName}" created successfully`));
                                });
                        })
                } else {
                    logger(chalk.yellow(`Admin already exists`));
                }
            });
        logger(chalk.green(`Script executed successfully`));
    } catch (e) {
        logger(chalk.red(`Script executed with error ${e}`));
    }
    logger(chalk.yellow(`End of the installation script`));
};

main()
    .then(() => {
        setTimeout((() => {
            return process.exit(0);
        }), 500);
    });
