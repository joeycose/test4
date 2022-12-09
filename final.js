const fs = require('fs'); 
const data_folder = "./data/";
const Sequelize = require('sequelize');

var mongoose = require('mongoose');
var employees;
var departments;

mongoose.connect("mongodb.net/test#4");

var exports = module.exports = {};

const Sequelize = require('sequelize');

const startDB = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log('Cannot connect to DB.');
                reject(err);
            } else {
                const db = client.db();
                const finalUsers = db.collection('finalUsers');
                finalUsers.createIndex({ email: 1 }, { unique: true });
                console.log('DB connection successful.');
                resolve();
            }
        });
    });
}

const register = (user) => {
    return new Promise((resolve, reject) => {
        if (user.email.trim() === '' || user.password.trim() === '') {
            reject('Error: email or password cannot be empty.');
        } else {
            bcrypt.hash(user.password, 10, (err, hash) => {
                if (err) {
                    reject('Error: cannot create the user.');
                } else {
                    user.password = hash;
                    finalUsers.insertOne(user, (err, result) => {
                        if (err) {
                            if (err.code === 11000) {
                                reject(`Error: ${user.email} already exists`);
                            } else {
                                reject('Error: cannot create the user.');
                            }
                        } else {
                            resolve(result);
                        }
                    });
                }
            });
        }
    });
}
const signIn = (user) => {
    return new Promise((resolve, reject) => {
        const { email, password } = user;
        finalUsers.findOne({ email: email }, (err, result) => {
            if (err) {
                reject(err);
            } else if (!result) {
                reject(`Cannot find the user: ${email}`);
            } else if (result.password !== password) {
                reject(`Incorrect password for user ${email}`);
            } else {
                resolve(result);
            }
        });
    });
}

module.exports = { signIn }
module.exports = { register };
module.exports = { startDB };

var sequelize = new Sequelize('suoufqxe', 'suoufqxe', 'ziwXZ0gQDSaoMq_SIuxGsFQi257kkmSX', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});

 sequelize.authenticate().then(()=>console.log('Connection success.')).catch((err)=>console.log("Unable to connect to DB.", err));

 var Employee = sequelize.define('Employee',{

    empNum : {
        
        type: Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true    },
    
    firstName          : Sequelize.STRING,
    lastName           : Sequelize.STRING,
    email              : Sequelize.STRING,
    SSN                : Sequelize.STRING,
    addressStreet      : Sequelize.STRING,
    addressCity        : Sequelize.STRING,
    addressState       : Sequelize.STRING,
    addressPostal      : Sequelize.STRING,
    maritalStatus      : Sequelize.STRING,
    isManager          : Sequelize.BOOLEAN,
    employeeManagerNum : Sequelize.INTEGER,
    status             : Sequelize.STRING,
    department         : Sequelize.INTEGER,
    hireDate           : Sequelize.STRING

 });


 var Department = sequelize.define('Department', {


    departmentId : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    departmentName : Sequelize.STRING

 })

