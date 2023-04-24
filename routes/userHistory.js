// Router for user history.

const express = require("express");
const router = express.Router();
const historyDal = require("../services/postgres.userHistory.dal");

// Homepage for the history router, which displays all search history made by user logged in.

router.get("/", async (req, res) => {
  try {
    console.log(req.user._id);
    let theLogs = await historyDal.getHistoryByUserID(req.user._id);
    if (DEBUG) console.table(theLogs);
    res.render("userHistory", {
      theLogs,
      name: req.user.username,
      email: req.user.email,
      id: req.user._id,
    });
  } catch {
    res.render("503");
  }
});

module.exports = router;
