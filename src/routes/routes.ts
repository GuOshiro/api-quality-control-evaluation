import express from "express";
import Log from "./LogRoutes";
import Random from "./RandomRoutes";

export default function (app: express.Express) {
  app
    .route("/")
    .get((req: express.Request, res: express.Response) =>
      res.status(200).send("Test API")
    );

  app.use(express.json(), Log);
  app.use(express.json(), Random);
}
