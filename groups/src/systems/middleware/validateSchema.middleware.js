const { groupSchema } = require('../../routes/group.routes.schema');

const validateSchema = (req, res, next) => {
    const { error } = groupSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { validateSchema };
