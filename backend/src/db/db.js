const mongoose = require("mongoose");

// MongoDB connection URL
const mongoURI = `${process.env.MONGODB_URI}/UberBackend`;

// Connection options
const options = {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
};
const connectDb = async () => {
    try {
        await mongoose.connect(mongoURI, options)
        console.log('MongoDb connection successful ✅')
    } catch (error) {
        console.log('Error connecting to MongoDB: ' + error);
        process.exit(1);
    }
}

module.exports = connectDb;