export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};

// export const validateLogin = (req, res, next) => {
//     const { email, password, name } = req.body;
//     if ((!email && !name) || !password) {
//         return res.status(400).json({ message: "Email or name and password are required" });
//     }
//     next();
// };

// export const authenticate = async (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"
//   if (!token) {
//     return res.status(401).json({ message: 'No token, authorization denied' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const [users] = await db.query('SELECT id FROM Users WHERE id = ?', [decoded.id]);
//     if (users.length === 0) {
//       return res.status(401).json({ message: 'Invalid user' });
//     }
//     req.user = { id: decoded.id };
//     next();
//   } catch (err) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

