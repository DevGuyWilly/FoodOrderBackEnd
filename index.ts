import express from "express";
import { AdminRouter, VendorRoute } from "./routes/index";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URL } from "./config";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(MONGO_URL)
  .then((result) => console.log("DB Connection Sucessful"))
  .catch((err) => console.log("An error occured " + err));

app.use("/admin", AdminRouter);
app.use("/vendor", VendorRoute);

app.listen(8000, () => {
  console.clear();
  console.log("App is listeninig on port 8000");
});
