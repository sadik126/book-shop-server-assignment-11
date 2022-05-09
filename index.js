const express = require('express')
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');

//MIDDLEWARE
app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send('running');
});

app.listen(port, () => {
    console.log('crud is running')
})




const uri = "mongodb+srv://<username>:<password>@cluster0.jkugq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
