const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()


// middlewares
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mcynqnr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
      
    const menuCollection = client.db('restaurantDB').collection('menu');
    const reviewCollection = client.db('restaurantDB').collection('reviews');

    app.get('/menu', async(req, res)=>{
      const result = await menuCollection.find().toArray();
      res.send(result);
    })

    app.get('/reviews', async(req, res)=>{
      const result = await reviewCollection.find().toArray();
      res.send(result);
    })
     
    // Send a ping to confirm a successful connection
    
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get("/", (req, res)=>{
    res.send(`Server is running on port ${port}`)
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})