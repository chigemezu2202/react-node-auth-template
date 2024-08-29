import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })

    //Hack: sign the generated token to cookie
    res.cookie("token", token, {
        httpOnly: true,  //Hack: impliments XSS 
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", //Hack: impliments CSRF 
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};