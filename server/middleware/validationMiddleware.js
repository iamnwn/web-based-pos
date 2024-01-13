const validationMiddleware = (schema) => async (req, res, next) => {
  const body = req.body;
  try {
    await schema.validate(body, { abortEarly: false });
    next();
  } catch (error) {
    console.error("Yup validation error:", error.message);
    res
      .status(400)
      .json({ error: "Invalid data provided", details: error.errors });
  }
};

module.exports = validationMiddleware;
