const express = require("express");
const app = express();
const port = 5000 || process.env.PROT;
var cors = require("cors");
const {
  MongoClient,
  ServerApiVersion,
  ObjectId,
  ObjectID,
} = require("mongodb");
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
    const servicesREVIEW = client.db("servicesReview").collection("review");

    // all services start
    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = OurServices.find(query);
      const services = await cursor.toArray();
      const count = await OurServices.estimatedDocumentCount();
      res.send({ count, services });
    }); // all services end

    // add product start
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await OurServices.insertOne(service);
      res.send(result);
    });
    // add product end

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

    // added review start
    app.post("/review", async (req, res) => {
      const review = req.body;
      const result = await servicesREVIEW.insertOne(review);
      res.send(result);
    });
    // added review end

    // get review start
    app.get("/review", async (req, res) => {
      let query = {};

      if (req.query.email) {
        query = {
          email: req.query.email,
        };
      }
      const cursor = servicesREVIEW.find(query);
      const review = await cursor.toArray();
      const count = await servicesREVIEW.estimatedDocumentCount();
      res.send({ count, review });
    });
    // get review end

    // review delete start
    app.delete("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await servicesREVIEW.deleteOne(query);
      res.send(result);
    });
    // review delete end

    // updated review start
    app.patch("/review/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };

      const status = req.body.status;
      const updatedDoc = {
        $set: {
          status: status,
        },
      };
      const result = await servicesREVIEW.updateOne(query, updatedDoc);

      res.send(result);
    });
    // updated review start

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
