import mongoose from "mongoose";


const dbConnection = async () => {
    mongoose.connect(`mongodb://127.0.0.1:27017/E-COMMERCE`)
        .then(() => {
            console.log('DB Connected');
        }).catch(() => {
            console.log('DB Error');
        })
}

export default dbConnection;

// ${process.env.DB_CONNECTION}