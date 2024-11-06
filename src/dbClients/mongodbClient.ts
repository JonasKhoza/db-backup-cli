import mongoose from "mongoose";
import { MongoClient, ConnectOptions } from "mongodb";

import { ConnectionInfoI } from "../models/database.model";

//host => contains the cluster

const mongodbConnect = async ({
  host,
  port,
  user,
  password,
  database,
}: ConnectionInfoI) => {
  //Configure localhost to work in a Docker environment
  const hostIp =
    host === "localhost" || host === "127.0.0.1"
      ? "host.docker.internal"
      : host;

  //For MongoDB Atlas
  const uri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;
  //FOR ANY MONGODB SERVER
  const uri2 = `mongodb://${user}:${password}@${hostIp}:${
    port || 27017
  }/${database}`;
  //Create a client for the second option
  const client = new MongoClient(uri2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions);

  try {
    if (host.includes("cluster")) {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 1, //The maximum number of connections in the connection pool.
        serverSelectionTimeoutMS: 5000, // specifies how long(in milliseconds) Mongoose will wait to connect to a MongoDB server before timing out.
        socketTimeoutMS: 120000, //Connection will close after being idle for 1minute
      } as mongoose.ConnectOptions);

      console.log("Connected to MongoDB  database...");
    } else {
      await client.connect();
      console.log("Connected successfully to MongoDB");
    }
  } catch (error: any) {
    throw new Error(`Failed to connect to database: ${error?.message}`);
  } finally {
    await client.close();
  }
};

export default mongodbConnect;
