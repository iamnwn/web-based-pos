const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const stock = require("./models/store/Stock");
const cors = require("cors");
const corsOptions = require("./config/coresOptions");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");

const app = express();
app.use(bodyParser.json());

// cros origin resource
app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());

app.get("/newstore/:name", async (req, res) => {
  const store = req.params.name;
  const stok = await stock(store);

  const records = await stok.findAll({});
});

//routes---------------------------------------
app.use("/refresh", require("./routes/refresh"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/", require("./routes/root"));

app.use(verifyJWT);
app.use("/api/customer", require("./routes/api/customer"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/stores", require("./routes/api/stroe"));
app.use("/api/productcategory", require("./routes/api/productCategory"));
app.use("/api/product", require("./routes/api/product"));
// app.use("/api/stock", require("./routes/api/stock"));
// app.use("/api/invoice", require("./routes/api/invoice"));

db.sequelize.sync().then((res) => {
  app.listen(3000, () => {});
});
