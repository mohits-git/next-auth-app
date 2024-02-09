import mongoose from "mongoose";
export async function connect() {
    const uri = process.env.DB_URI;
    try {
        mongoose.connect(uri);
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log("Database connected :)");
        })
        connection.on('error', (err) => {
            console.log("Something went wrong :(", err);
            process.exit();
        })
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
}
