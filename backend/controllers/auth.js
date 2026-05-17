import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: 'User has been created.' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ success: false, message: 'User not found!' });

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return res.status(400).json({ success: false, message: 'Wrong credentials!' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secretkey');

    const { password, ...otherDetails } = user._doc;
    res.status(200).json({ success: true, user: otherDetails, token });
  } catch (err) {
    next(err);
  }
};
