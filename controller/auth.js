import User from "../models/User.js";

// user verification model
import userVerification from "../models/userVerification.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//email handler
import nodemailer from "nodemailer";

// unique string
import { emailPlain, generateOTP, generateOTPTemp, mailTransport } from "../utils/mail.js";

import { isValidObjectId } from "mongoose";

export const register = async(req, res, next)=> {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt)

    const newUser = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        country:req.body.country,
        gender:req.body.gender,
        password:hash
    });

    const OTP = generateOTP()
      const verificationToken = new userVerification({
        Owner: newUser._id,
        token: OTP
      })

    await verificationToken.save()  
    await newUser.save()

    mailTransport().sendMail({
      from: "ExaRealEstate.com",
      to: newUser.email,
      subject: "verify your email account",
      html:  generateOTPTemp(OTP),
    })

    res.status(200).send(newUser)
  } catch(err){
    next(err)
  }
} 


export const login = async(req, res, next)=> {
    try {
      const user = await User.findOne({email:req.body.email});
      if(!user) return next(createError(404, "User Not Found!"));

      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if(!isPasswordCorrect) return next(createError(400, "Wrong Password or Email!"));

      const token = jwt.sign({id:user._id, isAdmin:user.isAdmin }, process.env.JWTPRIVATEKEY)

      const {password, isAdmin, ...otherDetails} = user._doc;
      res.cookie("access_token", token, {
        httpOnly:true,
      }).status(200).json({...otherDetails})
    } catch(err){
      next(err)
    }
  } 


  export const verifyEmail = async (req, res, next) => {
    try {
      const {userId, otp} = req.body
      if(!userId || !otp.trim()) return next(createError(404, "Invalid request, missing parameter!")) ;

      if (!isValidObjectId(userId)) return next(createError(400, "Invalid user Id!"));

      const user = await User.findById(userId)
      if(!user) return next(createError(404, "Sorry user not found!")); 

      if(user.verified) next(createError(404, "This account is already verified!"));

      const token = await userVerification.findOne({Owner: user._id});
      if(!token) next(createError(404, "Sorry, Invalid User!"));

     const matchedToken = await token.compareToken(otp)
     if(!matchedToken) next(createError(404, "Sorry, Please provide a valid Email or Token!"));

     user.verified = true;

     await userVerification.findByIdAndDelete(token._id);
     await user.save()

     mailTransport().sendMail({
      from: "noreply@gmail.com",
      to:  req.body.user.email,
      subject: "Welcome",
      html:  emailPlain("Email Verification Completed", "Thank you, You can login now"),
    });

    res.json({success: true, message: "your email is verified login." })

    }catch(err){
     next(err)
    }
  }