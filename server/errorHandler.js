const pool = require("./mysql");

module.exports = {
  // router의 wrap
  // 최상위 try catch
  wrap:
    (logicFn, { onError } = {}) =>
      (req, res) => {
        try {
          logicFn(req, res).catch((err) => {
            const status = err.status ?? 409;
            delete err.status;
            res.status(status).send({ message: err.message, ...err });
          });
        } catch (err) {
          if (onError != {}) {
            onError(err);
          } else {
            res.status(500).send({ message: err.message });
          }
        }
      },
  // db connection error handler
  connectionWrap: async (callback) => {
    const conn = await pool.getConnection();
    try {
      return await callback(conn);
    } catch (err) {
      throw err;
    } finally {
      conn.release();
    }
  }};