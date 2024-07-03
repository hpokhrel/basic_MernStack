import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import productRoute from "./routes/Products.js";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello From Backend!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", productRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
