const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//MIDDLEWARE
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('running');
});

app.listen(port, () => {
    console.log('crud is running')
})




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jkugq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const collection = client.db('book-shop').collection('products')

        app.get('/products', async (req, res) => {
            const query = {}
            const cursor = collection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })

        app.get('/products', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = { email: email }
            const cursor = collection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        })

        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: ObjectId(id)
            }
            const service = await collection.findOne(query)
            res.send(service)
        })

        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const query = {
                _id: ObjectId(id)
            }
            const options = { upsert: true }
            const updatedDoc = {
                $set: {
                    stock: updatedUser.stock
                }
            }
            const result = await collection.updateOne(query, updatedDoc, options)
            res.send(result)
        })

        app.delete('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await collection.deleteOne(query)
            res.send(result)
        })

        app.post('/products', async (req, res) => {
            const newService = req.body;
            const result = await collection.insertOne(newService)
            res.send(result);
        })
    }
    finally {

    }
}

run().catch(console.dir)
