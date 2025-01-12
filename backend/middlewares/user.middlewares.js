import jwt from 'jsonwebtoken';
import User from '../models/user.models';

const isUserSignin = async (req, res, next) => {
  try {
    // Check if authorization header exists
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied. No token provided.' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
    const user = await User.findById(decoded.id);

    // Check if User exists and is an user
    if (!user) return res.status(404).json({ message: 'user not found.' });

    // Attach User to request object for later use in controllers
    req.user = user;

    next(); // Continue to next middleware/controller
  } catch (error) {
    res.status(400).json({ message: 'Invalid token or error while checking user status.' });
  }
};

export default isUserSignin;
