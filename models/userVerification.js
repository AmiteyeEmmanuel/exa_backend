
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UserVerificationSchema = new mongoose.Schema({
    Owner: {
        type:String,
        ref: 'User', 
        required: true
    },
    token: {
        type:String,
        required: true
    },
    createdAt: {
        type:Date,
        expire: 3600,
        default: Date.now
    },
    
},{timestamps:true}
);

UserVerificationSchema.pre("save", async function (next) {
    if(this.isModified("token")) {
        const hash = await bcrypt.hash(this.token, 8);
        this.token = hash;
    }
    next();
});

UserVerificationSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result;
}

export default mongoose.model("userVerification", UserVerificationSchema)

