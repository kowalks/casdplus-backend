const express = require('express');
const routes = require('./routes')

require('./database');

const app = express();

app.use(express.json());
app.use(routes);

console.log('HSDASIHDAUIHSDSDIUAHSDUI')

app.listen(process.env.PORT || 3000,
    () => console.log('Server is running...'));