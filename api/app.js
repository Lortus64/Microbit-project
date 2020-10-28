const express = require('express');
const app = express();
//const bodyParser = require('body-parser');
const port = 3000;
var cors = require('cors');

const socket = require('socket.io');
const mysql = require('mysql');

const bcrypt = require('./bcrypt')

var con = mysql.createConnection({
    host : "localhost",
    user : "user",
    password : "pass",
    database : "indproj"
});

app.use(cors());
app.use(require("body-parser").json())

app.get('/', (req, res, next)=> {
    try {
        con.query("SELECT * FROM log", function (err,result) {
            console.log(result);
            res.send(result);
        });
    } catch (err) {
        console.info(err);
    };
});

app.get('/getall', (req, res, next)=> {
    try {
        con.query("CALL getmicrobit()", function (err,result) {
            console.log(result);
            res.send(result);
        });
    } catch (err) {
        console.info(err);
    };
});

app.post('/getone', (req, res, next)=> {
    try {
        console.log('Got body:', req.body);

        let sql = `CALL getone(?)`;
        let val = [req.body.id];

        con.query(sql, val, function (err,result,fields) {
            console.log(result);
            res.send(result);
        });
    } catch (err) {
        console.info(err);
    };
});

app.post('/login', (req, res, next)=> {
    try {
        console.log('Got body:', req.body);

        let sql = `CALL login(?)`;
        let val = [req.body.username];

        con.query(sql, val, function (err,result,fields) {
            if(typeof result[0] !== "undefined") {
                if(bcrypt.compare(req.body.password,result[0][0].pass)) {
                    res.send("100");
                }
                else {
                    res.send("200");
                }
            }
            else {
                res.send("200");
            }
        });
    } catch (err) {
        console.info(err);
    };
});

app.post('/addbit', (req, res, next)=> {
    console.log("Skapar bit");
    try {
        console.log('Got body:', req.body);

        let sql = `CALL addbit(?,?,?)`;
        let val = [req.body.id, req.body.room, req.body.descript];

        con.query(sql, val, function (err,result,fields) {
            res.send("100");
        });
    } catch (err) {
        console.info(err);
    };
});

app.post('/del', (req, res, next)=> {
    try {
        console.log('Got body:', req.body);

        let sql = `CALL delbit(?)`;
        let val = [req.body.id];

        con.query(sql, val, function (err,result,fields) {
            res.send("100");
        });
    } catch (err) {
        console.info(err);
    };
});


app.post('/update', (req, res, next)=> {
    try {
        console.log('Got body:', req.body);

        let sql = `CALL updatebit(?, ?, ?, ?);`;
        let val = [req.body.oldid, req.body.id, req.body.room, req.body.descript];

        con.query(sql, val, function (err,result,fields) {
            res.send("100");
        });
    } catch (err) {
        console.info(err);
    };
});

const server = app.listen(port, () => {
        console.log(`App listening on port ${port}!`);
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log("New connection to socket");

    setInterval(() => {
        sendData(socket);
    }, 3000);
});

function sendData(socket){
    var send = [];
    var temp = [];

    try {
        con.query("CALL getmicrobit()", function (err,result) {
            result = result[0];

            for (let i = 0; i < result.length; i++) {
                temp.push(result[i]);

                if(typeof result[i+1] !== "undefined"){
                    if(result[i].room != result[i+1].room) {
                        send.push(temp);
                        temp = [];
                    }
                }
                else {
                    send.push(temp);
                    temp = [];
                };
            };

            // console.info("Send data")
            // console.info(send);
            socket.emit('data', send);
        });
    } catch (err) {
        console.info(err);
    };
};
