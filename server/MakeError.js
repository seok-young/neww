class MakeError extends Error {
    constructor(message, status, options = {}) {
      super(message);
      this.status = status;
  
      for (let key in options) {
        this[key] = options[key];
      }
    }
  }
  
  module.exports = MakeError;
  