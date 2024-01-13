const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();
app.use(bodyParser.json());

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
