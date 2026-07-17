const mongoose = require('mongoose')
const colors = require("colors");
const dns = require('dns');

// Some Windows/network DNS resolvers don't support the SRV/TXT lookups
// mongodb+srv:// URIs rely on; forcing a public resolver avoids ENOTIMP errors.
dns.setServers(['8.8.8.8', '1.1.1.1']);

// Serverless functions reuse the process between warm invocations, so cache
// the connection (promise) on `global` to avoid reconnecting/exhausting the
// connection pool on every request.
let cached = global._mongoose;
if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then((conn) => {
                console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline);
                return conn;
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (err) {
        cached.promise = null;
        console.log(`Error : ${err.message}`.red);
        throw err;
    }

    return cached.conn;
};

module.exports = connectDB;
