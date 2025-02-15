const mongoose = require("mongoose");
require("dotenv").config(); // Configuring dotenv to load environment variables from .env file

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,

    })
        .then(() => console.log("DB Connection Successfull"))
        .catch((error) => {
            console.log("DB Connection Failed");
            console.error(error);
            process.exit(1);
        })
};
