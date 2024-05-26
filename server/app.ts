import express, { Request, Response, NextFunction } from "express";
import { config } from "./config/config";
import cors from "cors";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo";

//express app
const app = express();

//middlewares
app.use(cors());
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true })); //req.body
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/todo", todoRoutes);

//connect to db and THEN listen to the port
mongoose
  .connect(config.mongo.uri)
  .then(() => {
    console.log("successfully connect to database");
    app.listen(config.server.port, () => {
      console.log("listening for requests on port", config.server.port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
