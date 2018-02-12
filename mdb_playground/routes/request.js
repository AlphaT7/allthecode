var express = require('express');
var router = express.Router();
const assert = require('assert');
var fs = require('fs');

/* GET request page. */
router.get('/', function (req, res, next) {

    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'database';
    //const datafile = 'db.json';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

/*        
        fs.readFile(datafile, 'utf8', function(err, data) {  
            if (err) throw err;
            insertDocuments(db, JSON.parse(data), function () {
            client.close();
            });
        });
*/        
        //findDocuments(db, function (){});
        /*
        filterDocuments(db, function (){
            client.close();
        });
        */

        filterDocuments (db, function(docs){

            res.json(docs);
            res.end();
    
        })

    });

    const insertDocuments = function (db, data, callback) {
        // Get the documents collection
        const collection = db.collection('collection');
        // Insert some documents
        collection.insertMany(data, function (err, result) {
            assert.equal(err, null);
            assert.equal(1000, result.result.n);
            assert.equal(1000, result.ops.length);
            console.log("Inserted 1000 documents into the collection");
            callback(result);
        });
    }

    const findDocuments = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('collection');
        // Find some documents
        collection.find({}).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs)
            callback(docs);
        });
    }

    const filterDocuments = function (db, callback) {
        // Get the documents collection
        const collection = db.collection('collection');
        // Find some documents
        collection.find({ 'state': 'NY' }).toArray(function (err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            callback(docs);
        });
    }

});

module.exports = router;