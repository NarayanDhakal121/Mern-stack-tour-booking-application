// 
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            photo: req.body.photo,
            role: req.body.role || 'user', 
            
        });

        await newUser.save();

        res.status(200).json({ success: true, message: "Successfully created" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// User login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

        // Check if the password is correct
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        // Determine the user's role (you should have a way to store the role in your User model)
        const role = existingUser.role || 'user'; // Default to 'user' if no role is found

        // Generate a token with role information
        const token = jwt.sign(
            { role: role, id: existingUser._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        // Set a cookie with the token
        res.cookie('accessToken', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // maxAge is in milliseconds

        // Send the user, token, and role as a response
        res.status(200).json({ result: existingUser, token, role });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
