const validationMiddleware = (schema) => async (req, res, next) => {
  const body = req.body;

  try {
    await schema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = validationMiddleware;
