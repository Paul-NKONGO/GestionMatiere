const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const providerRoutes = require("./routes/provider");
const deliveryRoutes = require("./routes/delivery");
const userRoutes = require("./routes/user");
const bspRoutes = require("./routes/bsp");
const materialRoutes = require("./routes/material");
const purchaseorderRoutes = require("./routes/purchaseorder");
const divisionRoutes = require("./routes/division");

require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/provider", providerRoutes);
app.use("/api/delivery", deliveryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/bsp", bspRoutes);
app.use("/api/material", materialRoutes);
app.use("/api/purchaseorder", purchaseorderRoutes);
app.use("/api/division", divisionRoutes);


mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () =>
    console.log(`Server started on ${process.env.PORT}`)
);