const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.json({ path: "login" });
});

module.exports = router;
