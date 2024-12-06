const models = require("../models/student-models");

module.exports = { 
 /***
   * [수련생] 수련생 상세 조회
   * params : { country_code, dojang_id, student_id }
   */
  StudentDetailRead: async (params) => {
    const db_res = await models.readStudentDetail(params);

    return db_res;
  },


  /***
   * [수련생] 수련생 조회 - 전체
   * params : { country_code, dojang_id, user_role, user_id }
   */
  StudentAllRead: async (params) => {
    const db_res = await models.readStudentAll(params);
  
    return db_res;
  }};