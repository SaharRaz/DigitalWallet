const validateSchema = (schema) => (req, res, next) => {
    console.log('[Middleware] Incoming body:', req.body);
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
        console.error('[Middleware] Joi error:', error);
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }

    req.body = value;
    console.log('[Middleware] Validated body:', req.body);
    next();
};

export default validateSchema;
