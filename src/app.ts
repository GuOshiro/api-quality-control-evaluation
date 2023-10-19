import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import serverless from "serverless-http";

const app = express();
app.use(bodyParser.text({ type: "*/*" }));
app.use(express.json());
routes(app);

export const handler = serverless(app);
export default serverless(app);
