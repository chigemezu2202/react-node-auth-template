import bcryptjs from 'bcryptjs';//Hack: password encryption
import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendVerificationEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    //Hack: distructure req.body 
    const { email, password, name } = req.body;


    //Todo: Error handling before signup || create user
    try {
        //Hack: check if any field is empty
        if (!email || !password || !name) {
            throw new Error("All fields are required")
        }

        //Hack: if user already exited
        const useAlreadyExists = await User.findOne({ email });

        if (useAlreadyExists) {
            return res.status(400).json({ success: false, message: "User already exists" })
        } 

        //Hack: Hash password
        const hashedPassword = await bcryptjs.hash(password, 10);

        //Hack: Verification Implement JWT Token Generation
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        //Hack: Create User
        //Hack: Saves a new document or updates an existing document if it has been modified.
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            verificationToken: verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 //Hack: 24 hours 
        })

        //Hack: Save User
        //Hack: If the document is new, it is inserted into the database. If it already exists, any changes made to the document are saved.
        await user.save();

        //Hack: JWT
        //Hack: Created token and set the cookie
        generateTokenAndSetCookie(res, user._id)

        //Hack: Send Verification email
        await sendVerificationEmail(user.email, verificationToken);
       
        //Hack: Send success response
        res.status(201).json({
            success: true, message: "User registered successfully", user: {
                ...user._doc,
                password: undefined
        }  })

    } catch (error) {
        res.status(400).json({ success: false, message: error.message })
    }
}
export const login = async (req, res) => {
    res.send("login route")
}
export const logout = async (req, res) => {
    res.send("logout route")
}
