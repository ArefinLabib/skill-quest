import jwt from 'jsonwebtoken';

export const validateRegister = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    next();
};


export const authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];
  // console.log('Authorization header:', authHeader);
  
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Malformed Authorization header' });
  // console.log('Token received:', token);
  

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });

    req.user = { id: payload.sub || payload.id };
    next();
  });
}

