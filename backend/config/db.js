const mongoose = require('mongoose')
const colors = require("colors");
const dns = require('dns');

// Some Windows/network DNS resolvers don't support the SRV/TXT lookups
// mongodb+srv:// URIs rely on; forcing a public resolver avoids ENOTIMP errors.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
    }
    catch (err) {
        console.log(`Error : ${err.message}`.red)
        process.exit()
    }
}

module.exports = connectDB;