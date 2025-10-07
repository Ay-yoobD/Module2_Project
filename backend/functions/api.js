import serverless from "serverless-http";
import app1 from "../server.js";   // your first app
import app2 from "../index.js";    // your second app
import express from "express";

const combined = express();

// Mount both apps under different prefixes
combined.use("/server", app1);
combined.use("/index", app2);

export const handler = serverless(combined);
