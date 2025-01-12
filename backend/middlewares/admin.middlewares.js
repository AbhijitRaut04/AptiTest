import jwt from 'jsonwebtoken';
import Admin from '../models/admin.models';

const isAdminSignin = async (req, res, next) => {
  try {
    // Check if authorization header exists
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    const admin = await Admin.findById(decoded.id);

    // Check if Admin exists and is an admin
    if (!admin) return res.status(404).json({ message: 'Admin not found.' });

    // Attach Admin to request object for later use in controllers
    req.admin = admin;

    next(); // Continue to next middleware/controller
  } catch (error) {
    res.status(400).json({ message: 'Invalid token or error while checking admin status.' });
  }
};

export default isAdminSignin;
