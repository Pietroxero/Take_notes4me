//this will be the dependencies needed to invoke the scrip

const express = require('express');
const htmlRoute = require('./routes/htmlroutes');
const apiRoute = require('./routes/apiroutes');


//this will show the configuration for express server

const app = express();

//sets the app to process data parsing

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('./Develop/public'));

//this will be the router
//this points our server to the 'route' file.

app.use('./', htmlRoute)
app.use('/api', apiRoute);

//sets an initial port, to be used in the listener
const PORT = process.env.PORT || 3001;

//listener

app.listen(PORT, () => 
console.log(`app is listening for PORT ${PORT}`)
);