const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        const userRole = req.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({
                success: false,
                message: `Forbidden: Role '${userRole}' does not have access to this resource`
            });
        }

        next();
    };
};

module.exports = authorizeRoles;