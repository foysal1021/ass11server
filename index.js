const express = require("express");
const app = express();
const port = 5000 || process.env.PROT;
var cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

//midle were start
app.use(cors());
app.use(express.json());
//midle were end

// mongo conect start

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uvaek7y.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const OurServices = client.db("assigement11").collection("medicalSerivces");
    // all services start
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = OurServices.find(query);
      const services = await cursor.toArray();
      const count = await OurServices.estimatedDocumentCount();
      res.send({ count, services });
    }); // all services end

    // 3 services start
    app.get("/services3", async (req, res) => {
      const query = {};
      const cursor = OurServices.find(query);
      const services = await cursor.limit(3).toArray();
      const count = await OurServices.estimatedDocumentCount();
      res.send({ count, services });
    }); // 3 services end

    // service details - specipic start(id) - start
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const querys = { _id: ObjectId(id) };
      const result = await OurServices.findOne(querys);
      res.send(result);
    });
    // service details - specipic start(id) - end
  } finally {
  }
}
run().catch(console.dir);
// mongo conect end

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
