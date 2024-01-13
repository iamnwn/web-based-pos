const express = require("express");
const router = express.Router();

router.get("", (req, res) => {
  res.json({ path: "home" });
});

module.exports = router;
