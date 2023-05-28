const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");

const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome the server is running!");
});

//mongo connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb Atlas"))
  .catch((error) => console.error(error));

app.listen(port, () => console.log("Server listening on port", port));
