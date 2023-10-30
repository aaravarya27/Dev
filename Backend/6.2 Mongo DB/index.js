const express = require("express");
const { ObjectId } = require("mongodb")
const { connectToDb, getDb } = require('./db')

const app = express();
const port = 3000;

app.use(express.json())

let db
connectToDb((err) => {
    if(!err){
        app.listen(port, () => {
            console.log(`App listening on port: ${port}`);
        })
        db = getDb()
    }
})

app.get("/books", async (req, res) => {
    const page = req.query.pages || 0
    const booksPerPage = 3

    let books = []
    await db.collection('books')
        .find()
        .sort({author:1})
        .skip(page* booksPerPage)
        .limit(booksPerPage)
        .forEach(book => books.push(book))
        .then(() => {
            res.status(200).json(books);
        })
        .catch(() => {
            res.status(500).json({error: 'Could not fetch documents'})
        })
})

app.get("/books/:id", async (req, res) => {
    if(ObjectId.isValid(req.params.id)){
        await db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({error: 'Could not fetch the document'})
        })
    }
    else{
        res.status(500).json({error: 'Invalid document ID'})
    }
})

app.post("/books", async (req, res) => {
    const book = req.body
    await db.collection('books')
        .insertOne(book)
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            res.status(500).json({err: "Could not create a new document"})
        })
})

app.delete("/books/:id", async(req, res) => {
    if(ObjectId.isValid(req.params.id)){
        await db.collection('books')
            .deleteOne({_id: new ObjectId(req.params.id)})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not delete the document'})
            })
    }
    else{
        res.status(500).json({error: 'Invalid document ID'})
    }
})

app.patch("/books/:id", async (req, res) => {
    const updates = req.body
    if(ObjectId.isValid(req.params.id)){
        await db.collection('books')
            .updateOne({_id: new ObjectId(req.params.id)}, {$set: updates})
            .then(result => {
                res.status(200).json(result)
            })
            .catch(err => {
                res.status(500).json({error: 'Could not update the document'})
            })
    }
    else{
        res.status(500).json({error: 'Invalid document ID'})
    }
})