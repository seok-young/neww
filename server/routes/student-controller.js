const express = require("express");
const { wrap } = require("../errorHandler");
const services = require("../services/student-services");
const validators = require("../validators");

const group = express.Router();
const router = express.Router();

group.use("/student", router);

//수련생 전체 조회
router.get(
  "/all/read/:dojang_id",
  validators.params(["dojang_id"]),
  wrap(async (req, res) => {
    const params = {
      ...req.params,
      country_code: req.country_code,
    };

    const result = await services.StudentAllRead(params);

    res.send(result);
  })
);

//수련생 상세 조회
router.get(
  "/detail/read/:dojang_id/:student_id",
  validators.params(["dojang_id", "student_id"]),
  wrap(async (req, res) => {
    const params = {
      ...req.params,
      country_code: req.country_code,
    };

    const result = await services.StudentDetailRead(params);

    res.send(result);
  })
);


  
module.exports = group;