
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// module.exports = mongoose;
export default mongoose;
