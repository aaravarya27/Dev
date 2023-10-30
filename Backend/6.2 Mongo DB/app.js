import mongo from 'mongodb';
import assert from 'assert';

const MongoClient = mongo.MongoClient;
const url = 'mongodb+srv://aaravarya27:<password>@cluster0.h42zxip.mongodb.net';

const dbName = "fruitsDB";

const client = new MongoClient(url);

async function connectServer(){
    const connection = await client.connect();
    const db = await connection.db(dbName);
    console.log("Connection Established")
    return db;
}

connectServer().then((db, callback) => {
    const collection =  db.collection('documents');
    console.log(collection)
    collection.insertMany([
      {a : 1}, {a : 2}, {a : 3, b: 2}
    ], function(err, result){
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
    });
});
