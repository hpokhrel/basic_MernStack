import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import productRoute from "./routes/Products.js";
import userRoute from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello From Backend!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use("/api", productRoute);
app.use("/user", userRoute);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
