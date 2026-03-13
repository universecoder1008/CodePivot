const mongoose = require('mongoose');
const config = require('config');
const dbgr = require('debug')("development:mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`${config.get('MONGODB_URL')}/placementplatform`);
        dbgr("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;