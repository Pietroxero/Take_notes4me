// loading data
//this will be linking the routes we have made to data sources

const router = required('express').Router();
const uid = require('uuid');
const fs = require('fs');
const until = require('util');
const writeFileAsync = util.promisify(fs.readFile);
const readFileAsync = util.promisify(fs.readFile);
const writeFile = data => {return writeFileAsync('../Develop/db/db.json', JSON.stringify(data))};
const readFile = () => {return readFileAsync('./Develop/db/db.json', 'utf8')};

//routes


