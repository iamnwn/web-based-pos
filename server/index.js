const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const stock = require("./models/store/Stock");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.get("/newstore/:name", async (req, res) => {
  const store = req.params.name;
  stock(store)
    .then((e) => {
      if (e) res.status(201).json({ message: "New store created" });
    })
    .catch((e) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

//routes---------------------------------------
app.use("/", require("./routes/root"));
app.use("/api/customer", require("./routes/api/customer"));
app.use("/api/user", require("./routes/api/user"));
// app.use("/api/stores", require("./routes/api/stores"));
// app.use("/api/stock", require("./routes/api/stock"));
// app.use("/api/productcategory", require("./routes/api/productCategory"));
// app.use("/api/product", require("./routes/api/product"));
// app.use("/api/invoice", require("./routes/api/invoice"));

db.sequelize.sync().then((res) => {
  app.listen(3000, () => {
    console.log("server running");
  });
});
