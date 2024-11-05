import mongoose from "mongoose";

import { ConnectionInfoI } from "../models/database.model";

//host => contains the cluster

//IMPLEMETENT POSSIBILITIES OF NOT USING MONGODB ATLAS

const mongodbConnect = async ({
  host,
  port,
  user,
  password,
  database,
}: ConnectionInfoI) => {
  const uri = `mongodb+srv://${user}:${password}@${host}/${database}?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 1, //The maximum number of connections in the connection pool.
      serverSelectionTimeoutMS: 5000, // specifies how long(in milliseconds) Mongoose will wait to connect to a MongoDB server before timing out.
      socketTimeoutMS: 120000, //Connection will close after being idle for 1minute
    } as mongoose.ConnectOptions);

    console.log("Connected to MongoDB  database...");
  } catch (error: any) {
    throw new Error(`Failed to connect to database: ${error?.message}`);
  }
};

export default mongodbConnect;
