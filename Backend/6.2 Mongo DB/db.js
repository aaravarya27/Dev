const { MongoClient } = require("mongodb")

let dbConnection
let uri = 'mongodb+srv://aaravarya27:aaravarya27@cluster0.awjv38t.mongodb.net/?retryWrites=true&w=majority'
module.exports = {
    connectToDb: (cb) => {
         MongoClient.connect(uri)
            .then(async (client) => {
                dbConnection = await client.db()
                return cb()
            })
            .catch(err => {
                console.log(err);
                return cb(err)
            });
    },
    getDb: () => dbConnection
}