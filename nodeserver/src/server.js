const express = require('express');
const bodyparser = require("body-parser");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const assert = require('assert');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const user = encodeURIComponent('mongo');
const password = encodeURIComponent('mongo');
const authMechanism = 'DEFAULT';

const dbURL = `mongodb://${user}:${password}@mongodb/?authMechanism=${authMechanism}`;;
const dbNAME = 'todo';
const colNAME = 'task'
const options = {
	useUnifiedTopology : true,
	useNewUrlParser : true
};

const checkjwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-raxpr-bc.auth0.com/.well-known/jwks.json'
    }),
    audience: '1yOKopxf3e4jFZVYTz9hwfCp0Vqi7C51',
    issuer: 'https://dev-raxpr-bc.auth0.com/',
    algorithms: ['RS256']
});

// define the express app
const app = express();

//enable all CORS requests
app.use(cors());

//enhance this app security
app.use(helmet());

//use body-parser to parse application/json content-type
app.use(bodyparser.json());

//log HTTP requests
app.use(morgan("combined"));

const client = new MongoClient(dbURL, options);
client.connect(err => {
    assert.equal(err, null);
    console.log('Connected successfully to server!!');    
});
const db = client.db(dbNAME);

//post questions
app.post('/api', checkjwt, (req, res)=> {
    db.collection(colNAME).insertOne(req.body, (err, result) => {
        if (err){
            console.log(err);
            if (err.code == 11000) res.status(500).send('\nalready existed...');
            else res.status(500).send('\nSorry, something wrong...');
        }else{
            res.status(200).send(result)
        }
    });
}); 

//get all posted questions
app.get('/api', (req, res) => {
    db.collection(colNAME).find().toArray((err, question) => {
        if (err) res.status(500).send();
        else res.status(200).send(question);
    });
});

//post a answer to a specific question
app.post('/api/answer/:id',checkjwt ,(req, res)=> {
    const { answer } = req.body;
    //idで検索して配列を挿入
    db.collection(colNAME).updateOne(
        {"_id" : new ObjectID( req.params.id )}, //ObjectIDのインスタンス化が必要
        {$push: {answer: answer}},
        (err, result)=> {
            if (err) res.status(500).send();
            else res.status(200).send(result);
    });
});

//get a specific question
app.get('/api/:id', (req, res) => {
    db.collection(colNAME).find({"_id" : new ObjectID( req.params.id )}).toArray((err, question) => {
        if (err) res.status(500).send();
        if (question.length > 1) return res.status(500).send();
        if (question.length === 0) return res.status(404).send();    
        res.status(200).send(question);
    });
});

//delete a specific question
app.delete('/api/:id', (req, res)=> {
    db.collection(colNAME).findOneAndDelete({"_id" : new ObjectID( req.params.id )}, (err, doc)=> {
        if (err) res.status(500).send('miss!!');
        res.status(200).send(doc);
    });
});

//update a specific question
app.put('/api/:id', (req, res)=> {
    db.collection(colNAME).findOneAndUpdate({"_id": new ObjectID(req.params.id)}, {$set: req.body}, (err, result)=> {
        if (err) res.status(500).send(err);
        res.status(200).send(result);
    });
});

const server = app.listen(5555, () => {
    console.log("Node.js is listening to PORT:" + server.address().port);
});