const express = require("express");
const { auth, isEducator } = require("../middleware/auth.middleware");
const dashboardCtrl = require("../controllers/dashboard.controller");

const router = express.Router();

router.get("/educator", auth, isEducator, dashboardCtrl.getEducatorDashboard);

module.exports = router;
