const mongoose = require ('mongoose')
require('dotenv').config()

const mongoURI = process.env.BLOG_DB_URL_ROUTE;

 const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(mongoURI)
        console.log(`Connected to MongoDB Atlas host : ${conn.connection.host}`)

    } catch (error) {
        console.log(error.message)
    }
}

console.log("Connected to MongoDB!!!")

module.exports = connectToMongo;