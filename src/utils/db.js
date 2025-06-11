import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    }
    catch (err) {
        console.error('MongoDB connectio error:', err.message);
        process.exit(1);
    }
};

export default connectDB;
// This code defines a function to connect to a MongoDB database using Mongoose.
// AI is indeed good at adding comments ^.^