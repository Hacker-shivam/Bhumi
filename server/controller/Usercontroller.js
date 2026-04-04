import User from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// Signup function

export const Signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        console.log("Incoming:", req.body);

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

//  login




export const Login = async (req, res) => {
    const SECRET_KEY = "shivam";
    try {

        const { email, password } = req.body;

        // Check if user exists
        const userexisted = await User.findOne({ email });

        if (!userexisted) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        // Compare password
        const match = await bcrypt.compare(password, userexisted.password);

        if (!match) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // Generate token
        const token = jwt.sign(
            { id: userexisted._id, email: userexisted.email },
            SECRET_KEY,
            { expiresIn: "7d" }
        );

        // Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: false, // true in production (HTTPS)
            sameSite: "lax"
        });

        // Send success response
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: userexisted._id,
                name: userexisted.name,
                email: userexisted.email
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error logging in"
        });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
};

