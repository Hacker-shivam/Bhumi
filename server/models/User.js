import mongoose from "mongoose";

// connect database
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

// model
const User = mongoose.model("User", userSchema);

// default export
export default User;