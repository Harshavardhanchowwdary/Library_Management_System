const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register Controller
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name?.trim() || !email?.trim() || !password?.trim() || !role?.trim()) {
            return res.status(400).json({ message: "Fill all the required fields" });
        }
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: "This email is Already Exists" })
        }

        //hashpassword 
        const Hashpassword = await bcrypt.hash(password, 10);

        //userCreation
        const newUser = new User({ name, email, password: Hashpassword, role });

        await newUser.save();

        //tokenCreation 
        const token = jwt.sign(
            { id: newUser._id, role: newUser.role },
            process.env.JWT_SECRET || 'your_fallback_secret',
            { expiresIn: '1d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({ message: "User Registered Successfully", id:newUser._id })
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message })
    }

}

//Login Controller 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === "" || password === "") {
            return res.status(400).json({ message: "Fill the Required Form" })
        }
        const existingUser = await User.findOne({ email });
        //checking Email exists
        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Email or Password" })
        }
        //Password Checking
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Email or Password" });
        }

        //tokenCreation
        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'none',
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User Logined Successfully",
            id:existingUser._id ,
            name:existingUser.name,
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

// logout Controller
const logoutUser = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    });

    res.status(200).json({ message: "User Logged Out Successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };