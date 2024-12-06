// routes > index.js

const express = require("express");
const student = require("./student-controller");
const video = require("./video-controller");
const gallery = require("./gallery-controller");


const router  = express.Router();
router.use("/v2", student);
router.use("/v3", video);
router.use("/v4", gallery);



module.exports = router;
