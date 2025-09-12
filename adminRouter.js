const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express')
const AdminJSMongoose = require("@adminjs/mongoose");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
require('dotenv').config()


const User = require('./models/user');
const Student = require('./models/student');
const Teacher = require('./models/teacher');
const Gradetest = require('./models/gradetest');
const Mrshafiee = require('./models/mrshafiee');
const danialTajik = require('./models/danialTajik');
const yeganeAlz = require('./models/yeganeAlz')
const alireza = require('./models/alireza')
const AidaKholosi = require('./models/AidaKholosi')
const AidaShams = require('./models/AidaShams')
const FatemeAzadbakhsh = require('./models/FatemeAzadbakhsh');
const MarzieShojaei = require('./models/Marzieshojaei');
const Misaghmadani = require('./models/Misaghmadani');
const MrsGhorbanzade = require('./models/MrsGhorbanzade');
const MrsShafiee = require('./models/MrsShafiee');
const RezaShafiee = require('./models/RezaShafiee');

mongoose.set('strictQuery', true);
const mongooseDB = mongoose.connect(process.env.dburl)
    .then(() => {
        console.log('mongo connection open');
    })
    .catch(err => {
        console.log('error');
        console.log(err);
    })

AdminJS.registerAdapter({
    Resource: AdminJSMongoose.Resource,
    Database: AdminJSMongoose.Database,
});

const UserResourceOptions = {
    databases: [mongooseDB],
};
const adminOptions = {
    rootPath: "/admin",
    resources: [User, Student, Teacher, Gradetest, Mrshafiee, danialTajik ,yeganeAlz , alireza , AidaKholosi , AidaShams , FatemeAzadbakhsh, MarzieShojaei, Misaghmadani, 
    MrsGhorbanzade, MrsShafiee, RezaShafiee]
};
const admin = new AdminJS(adminOptions);
const authenticate = async (email, password) => {
    if (email === process.env.admin1E || "admin" && password === process.env.admin1P || "admin") {
        return Promise.resolve(process.env.admin1E);
    } else {
        return null;
    }
}


const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
    },
    null,
    {
        name: 'adminjs',
        secret: process.env.sessionSecret,
        resave: true,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
            maxAge: 1000 * 60 * 60 * 24 * 7
        },
        store: MongoStore.create({ mongoUrl: process.env.dburl })
    }
)

module.exports = adminRouter;
