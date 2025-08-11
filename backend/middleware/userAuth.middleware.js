// import jwt from 'jsonwebtoken';

export const validateRegister = (req, res, next) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};


// export const authenticateToken = (req, res, next) => {

//   const authHeader = req.headers['authorization'];
//   // console.log('Authorization header:', authHeader);
  
//   if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

//   const token = authHeader.split(' ')[1];
//   if (!token) return res.status(401).json({ error: 'Malformed Authorization header' });
//   // console.log('Token received:', token);
  

//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) return res.status(403).json({ error: 'Invalid or expired token' });

//     req.user = { id: payload.sub || payload.id };
//     next();
//   });
// }

import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Malformed Authorization header' });

    try {
        const payload = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) reject(err);
                else resolve(decoded);
            });
        });
        req.user = { id: payload.sub || payload.id, role: payload.role };
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

export const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }
        next();
    };
};