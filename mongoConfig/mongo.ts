import * as mongodb from "mongodb";
// import fastify from "fastify";

const { MongoClient } = mongodb;
let db: any;
let user: any;
let session: any;

const initDB = async () => {
  try {
    const database = await MongoClient.connect(`${process.env.MONGO_STRING}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (!database) throw new Error("Mongo not Connected!!!");
    db = database;
    // const fastify = require("fastify")();
    // fastify
    //   .register(require("fastify-mongodb"), { client: db })
    //   .register((fastify: any, opts: any, next: any) => {
    //     user = fastify.mongo.client.db("test").collection("user");
    //     session = fastify.mongo.client.db("test").collection("session");
    //     next();
    //   });
    // console.log("db", db);
    user = await db.db("test").collection("user");
    await user.createIndex({ "email.address": 1 });
    session = await db.db("test").collection("session");
    await session.createIndex({ sessionToken: 1 });
  } catch (err) {
    console.log("err connecting to mongo");
  }
};

initDB();

// const user = db.db("test").collection("user");
// user.createIndex({ "email.address": 1 });

// const session = db.db("test").collection("session");
// session.createIndex({ sessionToken: 1 });

export { db, user, session };
