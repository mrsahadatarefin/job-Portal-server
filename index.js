const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



const dotenv = require('dotenv').config();
app.use(cors());
app.use(express.json());








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.w5yg5ut.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){

    try{
 const fresherJobCollection = client.db('jobFinder').collection('fresher');
 const  experiencedJobCollection = client.db('jobFinder').collection('experience');
 const  worldwideJobCollection = client.db('jobFinder').collection('worldwide');
 const  companiesJobCollection = client.db('jobFinder').collection('companies');
  
 app.get('/companies', async(req,res)=>{
    const query = {}
    const cursor = companiesJobCollection.find(query);
    const job = await cursor.toArray();
    res.send(job)
 })

 app.get('/companies/:id', async(req,res)=>{
    const id = req.params.id;
    const query = {_id:new ObjectId(id)};
    const job = await companiesJobCollection.findOne(query);
    res.send(job)
 })
 app.get ('/fresher', async (req,res)=>{

    const query = {}
    const cursor = fresherJobCollection.find(query);
    const jobs = await cursor.toArray();
    res.send(jobs)


  });
  app.get('/fresher/:id', async (req,res)=>{

 const id = req.params.id;
 const query =  { _id: new ObjectId(id)};
 const job = await  fresherJobCollection.findOne(query);
 res.send(job)

  });
  
  app.get('/experience', async (req,res)=>{
    const query = {}
    const cursor = experiencedJobCollection.find(query)
    const job = await cursor.toArray()
    res.send(job)
  });
  app.get('/experience/:id', async (req,res)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)}
    const job = await experiencedJobCollection.findOne(query)
    res.send(job)
  });
  app.get('/worldwide', async(req,res)=>{
    const query = {}
    const cursor = worldwideJobCollection.find(query)
    const job = await cursor.toArray()
    res.send(job)
  });
  app.get('/worldwide/:id', async (req,res)=>{

    const id = req.params.id;
    const query ={ _id:new ObjectId(id)}
    const job = await worldwideJobCollection.findOne(query)
    res.send(job)
  })
  
   

    }
    finally{
        
    }


} run().catch(err => console.log(err))





app.get('/',(req,res)=>{
    res.send('job   server')
})








app.listen(port,()=>{
    console.log(`job protals running on ${port}`)
})