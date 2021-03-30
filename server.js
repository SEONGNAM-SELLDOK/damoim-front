var express = require('express');
var serveStatic = require('serve-static');

var app = express();
const cors = require('cors');

app.use(cors())
// /* 2번 */
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
// }));

app.use((req, res, next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type,Accept, Authortization');
    res.setHeader('Acces-Control-Allow-Methods','GET, POST, PATCH, DELETE');

app.use(serveStatic(__dirname + "/dist"));

var port = process.env.PORT || 5000;
app.listen(port);
