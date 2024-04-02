import mongoose, {Schema} from "mongoose";

mongoose.connect(process.env.DB_URL);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        walletAddress: String,
        avtImg: String,
        bgImg: String,
        lendingGrantId: Array,
        isLender: Boolean,
    },
    {
        timestamps: true,
    }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;