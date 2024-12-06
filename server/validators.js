const Joi = require("joi");

// Params validator
const paramsValidator = async (schema, req, res, next) => {
  try {
    const value = await schema.validateAsync(req.params);
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid Params. " + err.message });
  }
};

// Params validation function
const params = (paramList) => (req, res, next) => {
  let schemaObj = {};
  for (let key of paramList) {
    schemaObj[key] = paramsSchema[key];
  }

  const schema = Joi.object({
    ...schemaObj,
  });

  paramsValidator(schema, req, res, next);
};

// Params schema definitions
const paramsSchema = {
  dojang_id: Joi.string().required(),
  student_id: Joi.string().required(),
};

module.exports = { params };