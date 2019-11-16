// express, mongodb
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
// auth
import passport from 'passport';
// logging
import chalk from 'chalk';
// import debug from 'debug';
// logging + parsing requests
import morgan from 'morgan';
import cors from 'cors';
// env
import * as dotEnv from 'dotenv';

dotEnv.config();
// config
import configPassport from './authentification';
import configRouter from './routing';


const {
    PORT,
    MONGODB_URI,
} = process.env;

const app = express();
const logger = console.log;

/**
 * connecting to mongodb
 * run mongodb (OS X terminal): mongod
 */
mongoose.connect(
    MONGODB_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
)
    .then(() => {
        // autoIncrement.initialize(connection);
        logger('Connected Successfully to mongodb');
    })
    .catch(() => logger("Can't connect to mongodb"));


/**
 * middle-wares (parsing request + logging)
 */
app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

/**
 * allow all domains
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    return next();
});

/**
 * Config passport middle-ware
 */
configPassport(app, passport);


/**
 * routing
 */
configRouter(app, passport);


/**
 * Listening to requests
 */
app.listen(PORT, () => logger(`app listening on port ${chalk.green(PORT)}!`));

