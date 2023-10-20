import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/routes";
import serverless from "serverless-http";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.text({ type: "*/*" }));
app.use(express.json());
routes(app);

export const handler = serverless(app);
export default serverless(app);
