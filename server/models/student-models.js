const MakeError = require("../MakeError");
const _ = require("lodash");
const {connectionWrap } = require("../errorHandler");

module.exports = {
/***
   * [수련생] 수련생 조회 - 전체
   */
  readStudentAll: async (params) => {
    const { country_code, dojang_id} = params;
    

    
    const query = `CALL UP_FT_STUDENT_SELECT_ALL(?, ?)`;

    const result = await connectionWrap(async (conn) => {
      const [[res]] = await conn.query(query, [country_code, dojang_id]);
      return res;
    })

    return result;
   
  },

  /***
   * [수련생] 수련생 상세 조회
   */
  readStudentDetail: async (params) => {
    const { country_code, dojang_id, student_id } = params;

    const query = `
      CALL UP_FT_STUDENT_SELECT_DETAIL(?, ?, ?)
    `;

    const result = await connectionWrap(async (conn) => {
      const [[[res]]] = await conn.query(query, [
        country_code,
        dojang_id,
        student_id,
      ]);
      return res;
    })

    return result;
  },


};